import "./index.scss";
import { NavLink } from "react-router-dom";

export interface SaidBarProps {
  children: React.ReactNode;
}

const EventSaidBarComp: React.FC<SaidBarProps> = (props) => {
  const { children } = props;
  const arrayData = [
    {
      title: "EVENT",
      link: "/event",
    },
    {
      title: "DAILY CHECK-IN",
      link: "/daily-check-in",
    },

    {
      title: "WIFI POINT",
      link: "/wifi-point",
    },
  ];
  // const logOut = () => {
  //   dispatch(logout());
  // };
  return (
    <div className="said_bar">
      <div className="left_bar">
        <div className="said_bar_box">
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
          {/* <Link to="/" className="navigator" onClick={logOut}>
            LOG OUT
          </Link> */}
        </div>
      </div>
      {children}
    </div>
  );
};

export default EventSaidBarComp;
