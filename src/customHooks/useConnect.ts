import { useAppDispatch, useAppSelector } from "share/redux/hook";
import { logout } from "share/redux/metamask";
import { connectWallet } from "share/redux/metamask/thunks";

const useConnect = () => {
  const dispatch = useAppDispatch();
  const sdk = useAppSelector((state) => state.metamask.sdk);
  const account = useAppSelector((state) => state.metamask.account);

  // useEffect(() => {
  //   if (!account) {
  //     connectMetamask();
  //   }
  // }, [account]);
  function isMobileDevice() {
    return "ontouchstart" in window || "onmsgesturechange" in window;
  }
  const connectMetamask = async () => {
    try {
      if (!account) {
        if (isMobileDevice()) {
          window.open("https://wallet.roninchain.com", "_blank");
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
