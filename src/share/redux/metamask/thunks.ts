import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  setAccount,
  setError,
  setCurrentChainId,
  setEth,
  setFoc,
  setIsPending,
  setPoints,
  setProvider,
  setUsdt,
  setUsdc,
  setWron,
  setRouter,
} from ".";
import { WEB3, zero } from "utils/configs";
import { ethers } from "ethers";
import { RootState } from "../index";
import { clearOrders } from "../order";

export const connectWallet = createAsyncThunk(
  "metaMask/connectWallet",
  async (_, { dispatch }) => {
    if (window.ethereum) {
      try {
        dispatch(setProvider(new ethers.BrowserProvider(window.ethereum)));

        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        // dispatch(setAccount(accounts[0]));

        const chainId = await window.ethereum.request({
          method: "eth_chainId",
        });
        dispatch(setCurrentChainId(chainId.toString()));

        if (chainId.toString() !== "0x" + WEB3.CHAIN_ID.toString(16)) {
          dispatch(switchChain(WEB3.CHAIN_ID));
        }

        dispatch(login(accounts[0]));
        dispatch(connectContracts());

        window.ethereum.on("accountsChanged", (accounts: string[]) => {
          if (accounts.length > 0) {
            dispatch(setAccount(accounts[0]));
            dispatch(login(accounts[0]));
          } else {
            dispatch(setAccount(undefined));
          }
        });

        window.ethereum.on("chainChanged", (chainId: string) => {
          const chainIdInt = parseInt(chainId, 16);
          dispatch(setCurrentChainId(chainIdInt.toString()));
          //@ts-ignore
          dispatch(setProvider(new ethers.BrowserProvider(window.ethereum)));
          dispatch(connectContracts());
        });

        if (accounts.length > 0) dispatch(setAccount(accounts[0]));
      } catch (error) {
        dispatch(setError(error as Error));
      }
    } else {
      console.log("MetaMask is not installed");
    }
  }
);
export const switchChain = createAsyncThunk(
  "metaMask/switchChain",
  async (chainId: number, { dispatch }) => {
    // Switch between chains in MetaMask
    const chainIdHex = "0x" + chainId.toString(16);
    try {
      await window.ethereum?.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: chainIdHex }],
      });
      dispatch(setCurrentChainId(chainId.toString()));
    } catch (error) {
      await addChain(
        chainIdHex,
        WEB3.CHAIN_NAME,
        WEB3.JSON_RPC_URL,
        WEB3.SYMBOL,
        WEB3.SYMBOL,
        WEB3.SCAN_URL
      );
    }
    const latestData = await window.ethereum?.request({
      method: "eth_chainId",
    });
    dispatch(setCurrentChainId(latestData?.toString()));
  }
);
const addChain = async (
  chainId: string,
  chainName: string,
  rpcUrl: string,
  symbol: string,
  name: string,
  scanUrl: string
) => {
  try {
    await window.ethereum?.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          blockExplorerUrls: [scanUrl],
          iconUrls: [],
          nativeCurrency: {
            name,
            symbol,
            decimals: 18,
          },
          rpcUrls: [rpcUrl],
          chainId,
          chainName,
        },
      ],
    });
  } catch (error) {
    setError(error as Error);
  }
};

export const login = createAsyncThunk(
  "metaMask/login",
  async (account: string, { dispatch }) => {
    const nonce = await getNonce(account);
    const sig = await signMessage(nonce, account);
    const countryCode = await getCountryCode();
    const affiliateLinkCode = sessionStorage.getItem("ref")
      ? sessionStorage.getItem("ref")
      : "";
    const res = await axios.post(
      process.env.REACT_APP_BACKEND_URL + "auth/login",
      {
        sig,
        pubKey: account,
        countryCode,
        affiliateLinkCode,
      }
    );

    const user = {
      avatar: res.data.item.avatar,
      countryCode: res.data.item.countryCode,
      jwt: res.data.item.nonce,
    };
    dispatch(setPoints(res.data.item.point));
    user.jwt && sessionStorage.setItem("token", user.jwt);
    dispatch(setIsPending(true));
    dispatch(setAccount(account));
    return user;
  }
);
const getNonce = async (address: string) => {
  const res = await axios.post(
    `${process.env.REACT_APP_BACKEND_URL}auth/${address}`
  );
  return res.data.item;
};

const signMessage = (nonce: string, address: string) => {
  // @ts-ignore
  return window.ethereum.provider.request({
    method: "personal_sign",
    params: [nonce, address],
  });
};

const getCountryCode = async () => {
  const res = await axios.get("https://ipapi.co/json/");
  return res.data.country_code;
};

export const connectContracts = createAsyncThunk(
  "contract/setContract",
  async (_, { getState, dispatch }) => {
    const state = getState() as RootState;
    const provider = state.metamask.provider;
    if (!provider) {
      throw new Error("Provider not initialized");
    }
    const signer = await provider.getSigner();
    const usdt = new ethers.Contract(WEB3.ERC20.usdt, WEB3.ERC20.abi, signer);
    const foc = new ethers.Contract(WEB3.ERC20.foc, WEB3.ERC20.abi, signer);
    const eth = new ethers.Contract(WEB3.ERC20.eth, WEB3.ERC20.abi, signer);
    const usdc = new ethers.Contract(WEB3.ERC20.usdc, WEB3.ERC20.abi, signer);
    const weth = new ethers.Contract(WEB3.WETH.address, WEB3.WETH.abi, signer);
    const router = new ethers.Contract(
      WEB3.ROUTER.address,
      WEB3.ROUTER.abi,
      signer
    );
    dispatch(setUsdc(usdc));
    dispatch(setUsdt(usdt));
    dispatch(setFoc(foc));
    dispatch(setEth(eth));
    dispatch(setWron(weth));
    dispatch(setRouter(router));
  }
);

export const sendTokens = createAsyncThunk(
  "contract/sendTokens",
  async (
    payload: {
      amount: string;
      currency: "ETH" | "FOC" | "USDT";
      navigate: (success: boolean) => void;
    },
    { getState, dispatch }
  ) => {
    try {
      const state = getState() as RootState;
      if (payload.currency === "ETH") {
        const weth = state.metamask.weth;
        const toTransfer = ethers.parseEther(payload.amount);
        const address = state.metamask.account;

        if (toTransfer <= zero) {
          throw new Error("Amount should be greater than 0");
        }
        const wethBalance = await weth?.balanceOf(address);

        if (wethBalance < toTransfer) {
          const tx_wrap = await weth?.deposit({
            value: toTransfer - BigInt(wethBalance),
          });
          await tx_wrap.wait();
        }

        const tx = await weth?.transfer(WEB3.TOKEN_RECEIVER.eth, toTransfer);
        await tx.wait();
      }
      if (payload.currency === "USDT") {
        const usdc = state.metamask.usdc;
        const tx = await usdc?.transfer(
          WEB3.TOKEN_RECEIVER.usdc,
          ethers.parseUnits(payload.amount, 18)
        );
        await tx.wait();
      }
      if (payload.currency === "FOC") {
        console.log("TRYING TO SEND FOC");
        const foc = state.metamask.foc;
        console.log("FOC", foc);

        const tx = await foc?.transfer(
          WEB3.TOKEN_RECEIVER.foc,
          ethers.parseUnits(payload.amount, 18)
        );
        await tx.wait();
      }
      dispatch(clearOrders());
      payload.navigate(true);
    } catch (e) {
      payload.navigate(false);
      alert("Transaction failed");
      console.log(e);
    }
  }
);
