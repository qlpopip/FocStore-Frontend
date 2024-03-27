import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "share/redux/hook";
import { logout } from "share/redux/metamask";
import { connectWallet } from "share/redux/metamask/thunks";
import { WCEvent, WalletSDK } from "@roninnetwork/wallet-sdk";

const isMobileDevice = () => {
  return "ontouchstart" in window || "onmsgesturechange" in window;
};

const useConnect = () => {
  const dispatch = useAppDispatch();
  const account = useAppSelector((state) => state.metamask.account);
  const sdkRef = useRef<WalletSDK | null>(null);
  const [uri, setUri] = useState<string | null>(null);

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
      setUri(wcUri);
    });
  };

  const connectRonin = async () => {
    registerDisplayUriListener();
    await sdkRef.current?.connectMobile();
  };

  const connectMetamask = async () => {
    try {
      if (!account) {
        if (isMobileDevice()) {
          await connectRonin();
          if (uri) {
            window.open(sdkRef.current?.getDeeplink(), "_blank");
          }
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
