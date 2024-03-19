import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ethers } from 'ethers';
import { MetaMaskState } from './interface';

const initialState: MetaMaskState = {
  provider: null,
  account: undefined,
  isPending: false,
  error: null,
  currentChainId: undefined,
  balance: '0',
  points: 0,
  usdt: null,
  foc: null,
  eth: null
};


const metaMaskSlice = createSlice({
  name: 'metaMask',
  initialState,
  reducers: {
    setProvider: (state, action: PayloadAction<ethers.BrowserProvider | null>) => {
      state.provider = action.payload;
    },
    setAccount: (state, action: PayloadAction<string | undefined>) => {
      state.account = action.payload;
    },
    setIsPending: (state, action: PayloadAction<boolean>) => {
      state.isPending = action.payload;
    },
    setError: (state, action: PayloadAction<Error | null>) => {
      state.error = action.payload;
    },
    setCurrentChainId: (state, action: PayloadAction<string | undefined>) => {
      state.currentChainId = action.payload;
    },
    setBalance: (state, action: PayloadAction<string>) => {
      state.balance = action.payload;
    },
    setPoints: (state, action: PayloadAction<number>) => {
      state.points = action.payload;
    },
    setUsdt: (state, action) => {
      state.usdt = action.payload;
    },
    setFoc: (state, action) => {
      state.foc = action.payload;
    },
    setEth: (state, action) => {
      state.eth = action.payload;
    },
    logout: state => {
      state.provider = null;
      state.account = undefined;
      state.isPending = false;
      state.error = null;
      state.currentChainId = undefined;
      state.balance = '0';
      state.points = 0;
      state.usdt = null;
      state.foc = null;
      state.eth = null;
    }

  },
});

export const { logout, setProvider, setAccount, setIsPending, setError, setCurrentChainId, setBalance, setPoints, setEth, setUsdt, setFoc } = metaMaskSlice.actions;

export default metaMaskSlice.reducer;
