import "./index.scss";
import { useAppDispatch, useAppSelector } from "../../../share/redux/hook";
import { Link, useNavigate } from "react-router-dom";
import { Image } from "components/atoms";
import IconsFile from "assets/icons";
import { Cart } from "components/molecules";
import { connectWallet } from "share/redux/metamask/thunks";


const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate()

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
      navigate("/my-points")
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div id="navbar">
      <Link to="/" >
        <Image src={IconsFile.Logo} />
      </Link>
      <div className="left_side">
        <div onClick={connectMetamask} className="login" >
          <Image src={IconsFile.Profile} />
        </div>
        <Link to="/cart" >
          <Cart />
        </Link>
      </div>
    </div>
  );
};

export default Header;
