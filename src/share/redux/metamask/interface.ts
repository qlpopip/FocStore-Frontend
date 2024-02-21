import { ethers } from "ethers";

// src/store/metamask/types.ts
export interface MetaMaskState {
  provider: ethers.BrowserProvider | null;
  account: string | undefined;
  error: Error | null;
  currentChainId: string | undefined;
  balance: string;
}

export interface Token {
  address: string;
  symbol: string;
  decimals: number;
  image: string;
}
