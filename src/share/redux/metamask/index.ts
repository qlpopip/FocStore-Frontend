import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ethers } from 'ethers';
import { MetaMaskState } from './interface';

const initialState: MetaMaskState = {
  provider: null,
  account: undefined,
  error: null,
  currentChainId: undefined,
  balance: '0',
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
    setError: (state, action: PayloadAction<Error | null>) => {
      state.error = action.payload;
    },
    setCurrentChainId: (state, action: PayloadAction<string | undefined>) => {
      state.currentChainId = action.payload;
    },
    setBalance: (state, action: PayloadAction<string>) => {
      state.balance = action.payload;
    },
  },
});

export const { setProvider, setAccount, setError, setCurrentChainId, setBalance } = metaMaskSlice.actions;

export default metaMaskSlice.reducer;
