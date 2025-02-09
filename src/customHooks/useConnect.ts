import { useAppDispatch, useAppSelector } from "share/redux/hook";
import { logout } from "share/redux/metamask";
import { connectWallet } from "share/redux/metamask/thunks";

declare global {
  interface Window {
    ethereum: any;
  }
}

const useConnect = () => {
  const dispatch = useAppDispatch();
  const account = useAppSelector((state) => state.metamask.account);

  const connectMetamask = async () => {
    try {
      if (!account) {
        if (window.ethereum === undefined) {
          window.open("https://metamask.io/download/", "_blank");
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
