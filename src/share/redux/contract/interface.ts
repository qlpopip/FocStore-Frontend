import { ethers } from "ethers";

export interface ContractSliceType{   loading: boolean,
  contract: ethers.Contract | null,
  jackpotContract: ethers.Contract | null,
  ticketCount: number,
  error: string | null,
}


