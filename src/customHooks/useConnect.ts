import { useAppDispatch, useAppSelector } from "share/redux/hook";
import { connectWallet } from "share/redux/metamask/thunks";


const useConnect = () => {
  const dispatch = useAppDispatch();

  const account = useAppSelector((state) => state.metamask.account);
  function isMobileDevice() {
    return 'ontouchstart' in window || 'onmsgesturechange' in window;
  }
  const connectMetamask = async () => {
    try {
      if (!account) {
        if (isMobileDevice()) {
          const dappUrl = process.env.REACT_APP_PUBLIC_API_URL || ''; // TODO enter your dapp URL. For example: https://uniswap.exchange. (don't enter the "https://")
          window.location.href = "https://metamask.app.link/dapp/" + dappUrl.split('//')[1] + '/trade'
        }
        dispatch(connectWallet())
      }
    } catch (e) {
      console.log(e);
    }
  };
  return {
    connectMetamask
  };
};
export default useConnect;
