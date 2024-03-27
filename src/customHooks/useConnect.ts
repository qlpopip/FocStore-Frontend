import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "share/redux/hook";
import { logout } from "share/redux/metamask";
import { connectWallet } from "share/redux/metamask/thunks";
import { WCEvent } from "@roninnetwork/wallet-sdk";

function isMobileDevice() {
  return "ontouchstart" in window || "onmsgesturechange" in window;
}

const useConnect = () => {
  const dispatch = useAppDispatch();
  const account = useAppSelector((state) => state.metamask.account);
  const sdk = useAppSelector((state) => state.metamask.sdk);
  const [uri, setUri] = useState<string>("");
  const sdkRef = useRef<any>(null);

  useEffect(() => {
    sdkRef.current = sdk;
  }, [sdk]);

  // useEffect(() => {
  //   if (!account) {
  //     connectMetamask();
  //   }
  // }, [account]);

  const connectMetamask = async () => {
    try {
      if (!account) {
        if (isMobileDevice()) {
          sdkRef.current.on(WCEvent.DISPLAY_URI, (uri: string) => {
            setUri(uri);
          });
          await sdkRef.current.connectMobile();

          if (uri) {
            window.open(sdkRef.current.getDeepLink(), "_blank");
            return;
          }
        }
        dispatch(connectWallet());
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
