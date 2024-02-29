import Layout from "components/organisms/Layout";
import { SaidBar, Navigator } from "components/molecules";
import "./index.scss";
import { Button, Image } from "components/atoms";
import ImagesFile from "assets/images";
import { useAppSelector } from "share/redux/hook";
import { shortenAddress } from "utils/shortenAddress";
import { Link, useNavigate } from "react-router-dom";
import { WEB3 } from "utils/configs";
import { getPoints } from "./_api";

const Points: React.FC = () => {
  const account = useAppSelector((state) => state.metamask.account);
  const points = useAppSelector((state) => state.points.points);
  const navigate = useNavigate()
  const fetchData = async () => {
    try {
      const [data] = await getPoints()
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }
  fetchData()
  console.log(points)
  return (
    <div>
      <Layout id="my_points">
        <Navigator navigation="Reward / My Points" />
        <div className="my_points">
          <SaidBar >
            <div className="points_box">
              <div className="points">
                <Image src={ImagesFile.User} className="user_icon" />
                {account && <Link to={WEB3.SCAN_ADDRESS + account} target="_blank" className="address">{shortenAddress(account)}</Link>}
                <div className="point">
                  <p className="count">{points}</p>
                  <p>Points</p>
                </div>
                <Button className="primary" onClick={() => { navigate("/swap-points") }}>Convert Points to FOC</Button>
              </div>
              <div className="points_history">
                <p className="title_history">
                  Points History
                </p>
                <div className="line"></div>
                <div className="history">
                  <div className="point_history">
                    <p className="count_point">+ 20 P</p>
                    <p className="title">Reward {'>'} Daily Check-in</p>
                  </div>
                  <div className="date">2024.02.13</div>
                </div>
                <div className="line"></div>

                <div className="history">
                  <div className="point_history">
                    <p className="count_point">+ 20 P</p>
                    <p className="title">Reward {'>'} WIFI Point</p>
                  </div>
                  <div className="date">2024.02.13</div>
                </div>
              </div>

            </div>
          </SaidBar>
        </div>
      </Layout>
    </div>
  );
};
export default Points;
