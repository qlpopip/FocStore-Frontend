import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  setAccount,
  setError,
  setEth,
  setFoc,
  setIsPending,
  setPoints,
  setProvider,
  setUsdt,
} from ".";
import { WEB3 } from "utils/configs";
import { ethers } from "ethers";
import { RootState } from "../index";
import { clearOrders } from "../order";
import { WalletSDK, WCEvent } from "@roninnetwork/wallet-sdk";

function isMobileDevice() {
  return "ontouchstart" in window || "onmsgesturechange" in window;
}

export const connectWallet = createAsyncThunk(
  "metaMask/connectWallet",
  async (_, { dispatch }) => {
    const sdk = new WalletSDK({
      mobileOptions: {
        walletConnectProjectId: "465b3df31e1f68b98f0742db849788d9",
      },
    });
    var uri;
    sdk.on(WCEvent.DISPLAY_URI, (wcuri) => {
      uri = wcuri;
    });

    const isInstalled = checkRoninInstalled();
    if (!isInstalled) {
      console.log("Ronin Wallet is not installed");
      return;
    }

    try {
      if (isMobileDevice() && uri) {
        window.open(sdk.getDeeplink(), "_blank");
        return;
      }
      await sdk.connectInjected();
      const accounts = await sdk.requestAccounts();
      if (accounts) {
        dispatch(login(accounts[0]));
      }
      // dispatch(setIsPending(true))
      //@ts-ignore
      dispatch(setProvider(new ethers.BrowserProvider(window.ronin.provider)));
      dispatch(connectContracts());
    } catch (error) {
      dispatch(setError(error as Error));
    }
  }
);

function checkRoninInstalled() {
  if ("ronin" in window) {
    return true;
  }
  window.open("https://wallet.roninchain.com", "_blank");
  return false;
}

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
  return window.ronin.provider.request({
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
    dispatch(setUsdt(usdt));
    dispatch(setFoc(foc));
    dispatch(setEth(eth));
  }
);

export const sendTokens = createAsyncThunk(
  "contract/sendTokens",
  async (
    payload: {
      amount: string;
      currency: "ETH" | "FOC" | "USDT";
      navigate: () => void;
    },
    { getState, dispatch }
  ) => {
    try {
      const state = getState() as RootState;
      if (payload.currency === "ETH") {
        const eth = state.metamask.eth;
        const tx = await eth?.transfer(
          WEB3.TOKEN_RECEIVER.eth,
          ethers.parseEther(payload.amount)
        );
        await tx.wait();
      }
      if (payload.currency === "FOC") {
        const foc = state.metamask.foc;
        const tx = await foc?.transfer(
          WEB3.TOKEN_RECEIVER.foc,
          ethers.parseEther(payload.amount)
        );
        await tx.wait();
      }
      if (payload.currency === "USDT") {
        const usdt = state.metamask.usdt;
        const tx = await usdt?.transfer(
          WEB3.TOKEN_RECEIVER.usdt,
          ethers.parseUnits(payload.amount, 6)
        );
        await tx.wait();
      }
    } catch (e) {
      console.log(e);
    }
    dispatch(clearOrders());
    payload.navigate();
  }
);
