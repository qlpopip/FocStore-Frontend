import "./index.scss";
import { Link, } from "react-router-dom";
import { Image } from "components/atoms";
import IconsFile from "assets/icons";
import { Cart } from "components/molecules";


const Header: React.FC = () => {

  return (
    <div id="navbar">
      <Link to="/" >
        <Image src={IconsFile.Logo} />
      </Link>
      <div className="left_side">
        <Link to="/my-points" >
          <Image src={IconsFile.Profile} />
        </Link>
        <Link to="/cart" >
          <Cart />
        </Link>
      </div>
    </div>
  );
};

export default Header;
