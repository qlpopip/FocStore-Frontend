import "./index.scss";
import { Link, NavLink } from "react-router-dom";
import { Image } from "components/atoms";
import IconsFile from "assets/icons";
import { Cart } from "components/molecules";
import { useState } from "react";
import { useAppSelector, useAppDispatch } from "share/redux/hook";
import useConnect from "customHooks/useConnect";
import { logout } from "share/redux/metamask";

const Header: React.FC = () => {
  const account = useAppSelector((state) => state.metamask.account);
  const dispatch = useAppDispatch();
  const [showShopDropdown, setShowShopDropdown] = useState(false);
  const [showEventsDropdown, setShowEventsDropdown] = useState(false);
  const [showMyPageDropdown, setShowMyPageDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const isMobile = window.innerWidth <= 768;
  const { connectMetamask } = useConnect();

  const logOut = () => {
    dispatch(logout());
  };

  const toggleShopDropdown = () => {
    setShowShopDropdown(!showShopDropdown);
  };

  const toggleEventsDropdown = () => {
    setShowEventsDropdown(!showEventsDropdown);
  };

  const toggleMyPageDropdown = () => {
    setShowMyPageDropdown(!showMyPageDropdown);
  };

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  const shortenAddress = (
    address: string,
    startLength: number,
    endLength: number
  ) => {
    if (!address) return "";
    const truncatedStart = address.substring(0, startLength);
    const truncatedEnd = address.substring(address.length - endLength);
    return truncatedStart + "..." + truncatedEnd;
  };

  return (
    <div id="navbar">
      <div className="left_box">
        <Link to="/">
          <img src={IconsFile.Logo} style={{ width: "120px" }} alt="" />
        </Link>
        <div className="navigation_line">
          <div
            className="dropdown"
            onMouseEnter={toggleShopDropdown}
            onMouseLeave={toggleShopDropdown}
          >
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? " activeLink" : "")}
            >
              Shop
            </NavLink>
            {showShopDropdown && (
              <div className="dropdown-menu">
                <Link to="/orders">Order</Link>
              </div>
            )}
          </div>
          <div
            className="dropdown"
            onMouseEnter={toggleEventsDropdown}
            onMouseLeave={toggleEventsDropdown}
          >
            <NavLink
              to="/event"
              className={({ isActive }) => (isActive ? " activeLink" : "")}
            >
              Events
            </NavLink>
            {showEventsDropdown && (
              <div className="dropdown-menu">
                <Link to="/daily-check-in">Daily Check-in</Link>
                <Link to="/wifi-point">WiFi Point</Link>
              </div>
            )}
          </div>
          <div
            className="dropdown"
            onMouseEnter={toggleMyPageDropdown}
            onMouseLeave={toggleMyPageDropdown}
          >
            <NavLink
              to="/my-points"
              className={({ isActive }) => (isActive ? " activeLink" : "")}
            >
              My Page
            </NavLink>
            {showMyPageDropdown && (
              <div className="dropdown-menu">
                <Link to="/my-points">My Point</Link>
                <Link to="/swap-points">Swap Point</Link>
              </div>
            )}
          </div>
          <Link
            to="https://focswap-test.netlify.app"
            style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}
            target="_blank"
          >
            DEX
            <img
              src={IconsFile.SmallLink}
              alt="links"
              style={{ width: "18px" }}
            />
          </Link>
        </div>
      </div>
      <div className="right_side">
        <Link to="/my-points">
          <Image src={IconsFile.Profile} />
        </Link>
        <Link to="/cart">
          <Cart />
        </Link>
        {account ? (
          <div
            className="connect_wallet"
            onClick={toggleProfileDropdown}
            onMouseEnter={toggleProfileDropdown}
            onMouseLeave={toggleProfileDropdown}
          >
            {isMobile
              ? shortenAddress(account, 4, 4)
              : shortenAddress(account, 6, 4)}
            {showProfileDropdown && (
              <div className="dropdown-profile">
                <span onClick={logOut}>Disconnect</span>
              </div>
            )}
          </div>
        ) : (
          <div className="connect_wallet" onClick={connectMetamask}>
            {isMobile ? "Connect" : "Connect Wallet"}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
