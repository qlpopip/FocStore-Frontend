import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "share/redux/hook";
import { logout } from "share/redux/metamask";
import { connectWallet } from "share/redux/metamask/thunks";
import { WCEvent, WalletSDK } from "@roninnetwork/wallet-sdk";

function isMobileDevice() {
  return "ontouchstart" in window || "onmsgesturechange" in window;
}

const useConnect = () => {
  const dispatch = useAppDispatch();
  const account = useAppSelector((state) => state.metamask.account);
  const [uri, setUri] = useState<string>("");
  const sdkRef = useRef<any>(null);

  useEffect(() => {
    sdkRef.current = new WalletSDK({
      mobileOptions: {
        walletConnectProjectId: "465b3df31e1f68b98f0742db849788d9",
      },
    });
  }, []);

  async function connectRonin() {
    sdkRef.current.on(WCEvent.DISPLAY_URI, (uri: string) => {
      setUri(uri);
    });
    await sdkRef.current.connectMobile();
  }

  const connectMetamask = async () => {
    try {
      if (!account) {
        if (isMobileDevice()) {
          await connectRonin();

          if (uri && sdkRef.current) {
            window.open(sdkRef.current.getDeepLink(), "_blank");
            return;
          }
        } else {
          dispatch(connectWallet());
        }
      }
    } catch (e) {
      console.log(e);
    }
  };
  const handleLogoutAndConnect = async () => {
    // Dispatch logout action
    await dispatch(logout());
    sessionStorage.removeItem("token");
    window.location.reload();
    // Call connectMetamask after logout
    connectMetamask();
  };

  return {
    connectMetamask,
    handleLogoutAndConnect,
  };
};
export default useConnect;
