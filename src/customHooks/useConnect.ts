import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "share/redux/hook";
import { logout, setURI } from "share/redux/metamask";
import { connectWallet } from "share/redux/metamask/thunks";
import { WCEvent, WalletSDK } from "@roninnetwork/wallet-sdk";

const useConnect = () => {
  const dispatch = useAppDispatch();
  const account = useAppSelector((state) => state.metamask.account);
  const isMobile = useAppSelector((state) => state.metamask.isMobile);
  const sdkRef = useRef<WalletSDK | null>(null);

  useEffect(() => {
    const sdk = new WalletSDK({
      mobileOptions: {
        walletConnectProjectId: "22d5c6fcb2166b600bd72c3b1f0e67b2",
        useDeeplink: true,
      },
    });
    sdkRef.current = sdk;
  }, []);

  const registerDisplayUriListener = () => {
    sdkRef.current?.on(WCEvent.DISPLAY_URI, (wcUri: string) => {
      const encodedUri = encodeURIComponent(wcUri);
      setURI(`https://wallet.roninchain.com/auth-connect?uri=${encodedUri}`);
    });
  };

  const connectRonin = async () => {
    registerDisplayUriListener();
    await sdkRef.current?.connectMobile();
  };

  const connectMetamask = async () => {
    try {
      if (!account) {
        if (isMobile) {
          await connectRonin();
          return;
        }
        dispatch(connectWallet());
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleLogoutAndConnect = async () => {
    await dispatch(logout());
    sessionStorage.removeItem("token");
    window.location.reload();
    connectMetamask();
  };

  return { connectMetamask, handleLogoutAndConnect };
};

export default useConnect;
