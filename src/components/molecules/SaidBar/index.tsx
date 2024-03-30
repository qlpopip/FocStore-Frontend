import { useAppDispatch } from "share/redux/hook";
import "./index.scss";
import { Link, NavLink } from "react-router-dom";
import { logout } from "share/redux/metamask";

export interface SaidBarProps {
  children: React.ReactNode;
}

const SaidBarComp: React.FC<SaidBarProps> = (props) => {
  const { children } = props;
  const dispatch = useAppDispatch();
  const arrayData = [
    {
      title: "MY POINTS",
      link: "/my-points",
    },
    {
      title: "SWAP POINTS",
      link: "/swap-points",
    },
    {
      title: "DAILY CHECK-IN",
      link: "/daily-check-in",
    },

    {
      title: "WIFI POINT",
      link: "/wifi-point",
    },
    {
      title: "EVENT",
      link: "/event",
    },
    {
      title: "ORDER",
      link: "/orders",
    },
  ];
  const logOut = () => {
    dispatch(logout());
  };
  return (
    <div className="said_bar">
      <div className="left_bar">
        <div className="said_bar_box">
          <div className="default navigator ">
            <span>REWARD</span>
          </div>
          <div className="line"></div>
          {arrayData.map((item, index) => (
            <NavLink
              to={item.link}
              key={item.link + index}
              className={({ isActive }) =>
                isActive ? "navigator activeLink" : "navigator"
              }
            >
              {item.title}
            </NavLink>
          ))}
          <Link to="/" className="navigator" onClick={logOut}>
            LOG OUT
          </Link>
        </div>
      </div>
      {children}
    </div>
  );
};

export default SaidBarComp;
