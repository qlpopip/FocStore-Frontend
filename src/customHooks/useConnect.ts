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
    console.log("useEffect");
    sdkRef.current = new WalletSDK({
      mobileOptions: {
        walletConnectProjectId: "465b3df31e1f68b98f0742db849788d9",
      },
    });
  }, []);

  async function connectRonin() {
    console.log("connectRonin");
    sdkRef.current.on(WCEvent.DISPLAY_URI, (wcUri: string) => {
      setUri(wcUri);
    });
    console.log(sdkRef.current);
    await sdkRef.current.connectMobile();
  }

  const connectMetamask = async () => {
    try {
      if (!account) {
        if (isMobileDevice() && !uri) {
          await connectRonin();

          if (sdkRef.current) {
            sdkRef.current.on(WCEvent.DISPLAY_URI, (wcUri: string) => {
              window.open(
                `https://wallet.roninchain.com/auth-connect?uri=${wcUri}`,
                "_blank"
              );
            });
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
