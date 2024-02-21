import "./index.scss";
import { useAppDispatch, useAppSelector } from "../../../share/redux/hook";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { setCurrentLanguage } from "share/redux/common";
import { Image } from "components/atoms";

import IconsFile from "assets/icons";
import { Cart } from "components/molecules";


const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentLanguage = useAppSelector(
    (state) => state.common.currentLanguage,
  );


  useEffect(() => {
    const fetchData = async () => {
      const header = await import(`./data/${currentLanguage}.ts`);
      console.log(header)
    };
    fetchData();
  }, [currentLanguage]);
  // eslint-disable-next-line
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    dispatch(setCurrentLanguage(value));
  };
  // eslint-disable-next-line
  const goBack = () => {
    console.log("da")
  }
  return (
    <div id="navbar">
      <Link to="/" >
        <Image src={IconsFile.Logo} />
      </Link>
      {/* {pageData.map((item, index) => (
        <Link to={item.link} key={item.link + index}>
          {" "}
          {item.title}
        </Link>
      ))}
      <select
        className="select_language"
        onChange={handleChange}
        value={currentLanguage}
      >
        <option defaultValue="en">en</option>
        <option value="kr">kr</option>
        <option value="ru">ru</option>
      </select> */}
      <div className="left_side">
        <Link to="/about" >
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
