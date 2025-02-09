import { Contract, ethers } from "ethers";
import { WalletSDK } from "@roninnetwork/wallet-sdk";

// src/store/metamask/types.ts
export interface MetaMaskState {
  provider: ethers.BrowserProvider | null;
  account: string | undefined;
  isPending: boolean;
  error: Error | null;
  currentChainId: string | undefined;
  balance: string;
  points: number;
  usdt: Contract | null;
  usdc: Contract | null;
  foc: Contract | null;
  eth: Contract | null;
  weth: Contract | null;
  uri: string;
  isMobile: boolean;
  router: Contract | null;
}

export interface Token {
  address: string;
  symbol: string;
  decimals: number;
  image: string;
}
