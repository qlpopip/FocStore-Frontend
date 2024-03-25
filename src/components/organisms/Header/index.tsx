import "./index.scss";
import { Link, NavLink } from "react-router-dom";
import { Image } from "components/atoms";
import IconsFile from "assets/icons";
import { Cart } from "components/molecules";

const Header: React.FC = () => {
  return (
    <div id="navbar">
      <div className="left_box">
        <Link to="/">
          <img src={IconsFile.Logo} style={{ width: "120px" }} />
        </Link>
        <div className="navigation_line">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? " activeLink" : "")}
          >
            Shop
          </NavLink>
          <NavLink
            to="/event"
            className={({ isActive }) => (isActive ? " activeLink" : "")}
          >
            Events
          </NavLink>
        </div>
      </div>
      <div className="right_side">
        <Link to="/my-points">
          <Image src={IconsFile.Profile} />
        </Link>
        <Link to="/cart">
          <Cart />
        </Link>
      </div>
    </div>
  );
};

export default Header;
