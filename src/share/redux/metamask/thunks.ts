import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";
import { setAccount, setCurrentChainId, setError, setEth, setFoc, setIsPending, setPoints, setProvider, setUsdt } from '.';
import { WEB3 } from 'utils/configs';
import { ethers } from 'ethers';
import { RootState } from "../index";
import { clearOrders } from "../order";


export const connectWallet = createAsyncThunk('metaMask/connectWallet', async (_, { dispatch }) => {
    if (window.ethereum) {
        try {
            // dispatch(setIsPending(true))
            dispatch(setProvider(new ethers.BrowserProvider(window.ethereum)));

            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            dispatch(setAccount(accounts[0]));

            const chainId = await window.ethereum.request({ method: 'eth_chainId' });
            dispatch(setCurrentChainId(chainId.toString()));

            if (chainId.toString() !== '0x' + WEB3.CHAIN_ID.toString(16)) {
                dispatch(switchChain(WEB3.CHAIN_ID));
            }

            dispatch(login(accounts[0]));
            dispatch(connectContracts());

            window.ethereum.on('accountsChanged', (accounts: string[]) => {
                if (accounts.length > 0) {
                    dispatch(setAccount(accounts[0]));
                    dispatch(login(accounts[0]));
                } else {
                    dispatch(setAccount(undefined));
                }
            });

            window.ethereum.on('chainChanged', (chainId: string) => {
                const chainIdInt = parseInt(chainId, 16);
                dispatch(setCurrentChainId(chainIdInt.toString()));
                //@ts-ignore
                dispatch(setProvider(new ethers.BrowserProvider(window.ethereum)));
                dispatch(connectContracts());
            });


        } catch (error) {
            dispatch(setError(error as Error));
        }
    } else {
        console.log('MetaMask is not installed');
    }
});
export const switchChain = createAsyncThunk('metaMask/switchChain', async (chainId: number, { dispatch }) => {
    // Switch between chains in MetaMask
    const chainIdHex = '0x' + chainId.toString(16);
    try {
        await window.ethereum?.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: chainIdHex }],
        });
        dispatch(setCurrentChainId(chainId.toString()));
    } catch (error) {
        await addChain(chainIdHex,
            WEB3.CHAIN_NAME,
            WEB3.JSON_RPC_URL,
            WEB3.SYMBOL,
            WEB3.SYMBOL,
            WEB3.SCAN_URL
        );
    }
    const latestData = await window.ethereum?.request({ method: 'eth_chainId' });
    dispatch(setCurrentChainId(latestData?.toString()));
});
const addChain = async (chainId: string,
    chainName: string,
    rpcUrl: string,
    symbol: string,
    name: string,
    scanUrl: string) => {
    try {
        await window.ethereum?.request({
            method: "wallet_addEthereumChain",
            params: [
                {
                    blockExplorerUrls: [
                        scanUrl
                    ],
                    iconUrls: [],
                    nativeCurrency: {
                        name,
                        symbol,
                        decimals: 18
                    },
                    rpcUrls: [
                        rpcUrl
                    ],
                    chainId,
                    chainName
                }
            ]

        });
    } catch (error) {
        setError(error as Error);
    }
};
export const login = createAsyncThunk('metaMask/login', async (account: string, { dispatch }) => {
    const nonce = await getNonce(account);
    const sig = await signMessage(nonce, account);
    const countryCode = await getCountryCode();
    const affiliateLinkCode = sessionStorage.getItem("ref") ? sessionStorage.getItem("ref") : ""
    const res = await axios.post(process.env.REACT_APP_BACKEND_URL + 'auth/login', { sig, pubKey: account, countryCode, affiliateLinkCode });

    const user = {
        avatar: res.data.item.avatar,
        countryCode: res.data.item.countryCode,
        jwt: res.data.item.nonce
    }
    dispatch(setPoints(res.data.item.point))
    user.jwt && sessionStorage.setItem('token', user.jwt);
    dispatch(setIsPending(true))
    return user;
});
const getNonce = async (address: string) => {
    const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}auth/${address}`)
    return res.data.item;
};

const signMessage = (nonce: string, address: string) => {
    // @ts-ignore
    return window.ethereum.request({
        method: 'personal_sign',
        params: [nonce, address],
    });
}

const getCountryCode = async () => {
    const res = await axios.get('https://ipapi.co/json/')
    return res.data.country_code;
}


export const connectContracts = createAsyncThunk(
    'contract/setContract',
    async (_, { getState, dispatch }) => {
        const state = getState() as RootState;
        const provider = state.metamask.provider;
        if (!provider) {
            throw new Error("Provider not initialized");
        }
        const signer = await provider.getSigner();
        const usdt = new ethers.Contract(
            WEB3.ERC20.usdt,
            WEB3.ERC20.abi,
            signer
        );
        const foc = new ethers.Contract(
            WEB3.ERC20.foc,
            WEB3.ERC20.abi,
            signer
        );
        const eth = new ethers.Contract(
            WEB3.ERC20.eth,
            WEB3.ERC20.abi,
            signer
        );
        dispatch(setUsdt(usdt));
        dispatch(setFoc(foc));
        dispatch(setEth(eth));
    }
);

export const sendTokens = createAsyncThunk(
    'contract/sendTokens',
    async (payload: { amount: string, currency: 'ETH' | 'FOC' | 'USDT', navigate: () => void }, { getState, dispatch }) => {
        try {
            const state = getState() as RootState;
            if (payload.currency === 'ETH') {
                const eth = state.metamask.eth;
                const tx = await eth?.transfer(WEB3.TOKEN_RECEIVER.eth, ethers.parseEther(payload.amount));
                await tx.wait();
            }
            if (payload.currency === 'FOC') {
                const foc = state.metamask.foc;
                const tx = await foc?.transfer(WEB3.TOKEN_RECEIVER.foc, ethers.parseEther(payload.amount));
                await tx.wait();
            }
            if (payload.currency === 'USDT') {
                const usdt = state.metamask.usdt;
                const tx = await usdt?.transfer(WEB3.TOKEN_RECEIVER.usdt, ethers.parseUnits(payload.amount, 6));
                await tx.wait();
            }
        } catch (e) {
            console.log(e);
        }
        dispatch(clearOrders())
        payload.navigate();
    });