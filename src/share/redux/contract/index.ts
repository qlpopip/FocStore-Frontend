// Step 1: Define the slice
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ethers } from 'ethers';
import { connectWallet, switchChain } from '../metamask/thunks';
import { RootState } from '..';
import { WEB3 } from 'utils/configs';
import { ContractSliceType } from './interface';


const initialState: ContractSliceType = {
    loading: false,
    error: null as string | null,
    contract: null,
    jackpotContract: null,
    ticketCount: 0,
};
const poolId = 1;
const supportedChain = WEB3.CHAIN_ID;

export const makeTrade = createAsyncThunk(
    'contract/makeTrade',
    async (isUp: boolean,

        { getState, dispatch }) => {
        const state = getState() as RootState;
        const avatarUrl = state.player.playerAvatar;
        const countryCode = state.player.countryCode;
        const account = state.metamask.account;
        const amount = state.player.playerInvest.toString();

        if (!account) {
            dispatch(connectWallet());
        }
        const currentChainId = state.metamask.currentChainId;
        const contract = state.contract.contract;

        if (currentChainId !== supportedChain.toString()) {
            dispatch(switchChain(supportedChain));
        }

        if (!state.metamask.provider || !contract) {
            throw new Error("Provider or contract not initialized");
        }

        let tx = await contract.makeTrade([
            poolId,
            avatarUrl,
            countryCode,
            isUp,
            'mm'
        ], { value: ethers.parseEther(amount) });
        await tx.wait();
        dispatch(getTicketCount());

    }
);

export const connectContract = createAsyncThunk(
    'contract/setContract',
    async (_, { getState, dispatch }) => {
        const state = getState() as RootState;
        const provider = state.metamask.provider;
        if (!provider) {
            throw new Error("Provider not initialized");
        }
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(
            WEB3.GAME_CONTRACT_ADDRESS,
            WEB3.GAME_ABI,
            signer
        );
        dispatch(setContract(contract));
    }
);

const contractSlice = createSlice({
    name: 'contract',
    initialState,
    reducers: {
        setContract: (state, action) => {
            state.contract = action.payload;
        },
        setJackpotContract: (state, action) => {
            return {
                ...state,
                jackpotContract: action.payload,
            };
        },
        setTicketCount: (state, action) => {
            return {
                ...state,
                ticketCount: action.payload,
            };
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(makeTrade.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(makeTrade.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(makeTrade.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? null;


            });
    },
});
export const { setContract, setJackpotContract, setTicketCount } = contractSlice.actions;

export const getTicketCount = createAsyncThunk('jackpot/getTicketCount', async (_, { getState, dispatch }) => {
    const state = getState() as RootState;
    if (!state.metamask.provider || !state.metamask.account) return;
    const contract = new ethers.Contract(
        WEB3.TICKET_ADDRESS,
        WEB3.TICKET_ABI,
        state.metamask.provider
    );
    const ticketCount = await contract.balanceOf(state.metamask.account);
    const formatted = ethers.formatEther(ticketCount);
    dispatch(setTicketCount(formatted.split(".")[0]));
});


export const createJackpotContract = createAsyncThunk(
    'jackpot/createJackpotContract',
    async (_, { getState, dispatch }) => {
        const state = getState() as RootState;
        const provider = state.metamask.provider;
        if (!provider) return;

        const signer = await provider.getSigner();
        const contract = new ethers.Contract(
            WEB3.TICKET_JACKPOT_CONTRACT_ADDRESS,
            WEB3.JACKPOT_ABI,
            signer
        );
        dispatch(setJackpotContract(contract));
    });


export async function getSigFor(provider: any, account: string, amount: string) {
    // Get nonce from contract
    const contract = new ethers.Contract(
        WEB3.TICKET_ADDRESS,
        WEB3.TICKET_ABI,
        provider
    );
    const nonce = await contract.nonces(account);
    // Get Contract name
    const name = await contract.name();

    // Value of tokens to be sent
    const value = ethers.parseEther(amount);
    // Unix timestamp for deadline
    const deadline = (100000000000000).toString();

    const domain = {
        name,
        version: "1",
        verifyingContract: WEB3.TICKET_ADDRESS,
        chainId: supportedChain.toString(),
    }

    const types = {
        Permit: [
            { name: "owner", type: "address" },
            { name: "spender", type: "address" },
            { name: "value", type: "uint256" },
            { name: "nonce", type: "uint256" },
            { name: "deadline", type: "uint256" }
        ]
    }

    const values = {
        owner: account,
        spender: WEB3.TICKET_JACKPOT_CONTRACT_ADDRESS,
        value: value,
        nonce: nonce.toString(),
        deadline
    }


    const signer = await provider?.getSigner();
    const signature = await signer?.signTypedData(domain, types, values);
    return { sig: ethers.Signature.from(signature), deadline };
}

export default contractSlice.reducer;
