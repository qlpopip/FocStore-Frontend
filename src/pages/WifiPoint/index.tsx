import Layout from "components/organisms/Layout";
import { SaidBar, Navigator, Loader } from "components/molecules";
import "./index.scss";
import { Button, Image } from "components/atoms";
import ImagesFile from "assets/images";
import { useEffect, useState } from "react";
import axios from "axios";
import { postWifiPoint } from "./_api";
import { useAppDispatch } from "share/redux/hook";
import { setPoints } from "share/redux/metamask";


const WifiPoint: React.FC = () => {
  const dispatch = useAppDispatch()
  const [rewards, setRewards] = useState({
    times: 37,
    point: 412
  })
  const [pending, setPending] = useState(false)
  useEffect(() => {
    // eslint-disable-next-line
    const fetchData = async () => {
      try {
        setPending(true)
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/simple/price",
          {
            params: {
              ids: "tether,ethereum,force",
              vs_currencies: "usd",
            },
          }
        );
        setRewards({
          times: response.data.times,
          point: response.data.points,
        });
        setPending(false)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    // fetchData();
  }, []);
  const onClickClaim = async () => {
    setPending(true)
    const [data] = await postWifiPoint(rewards)
    dispatch(setPoints(data.item.author.point))
    setPending(false)
  }
  return (
    <div>
      <Layout id="daily-check-in">
        <Navigator navigation="Reward / WIFI Point" />
        {
          pending ? <Loader /> :
            <div className="daily_check">
              <SaidBar>
                <div className="wifi_point_box">
                  <div className="img_box">
                    <p className="title">Use FOC WIFI and get rewards!</p>
                    <Image src={ImagesFile.Network} className="network" />
                  </div>
                  <div className="stats">
                    <div className="use">
                      <Image src={ImagesFile.UserLogo} className="icon" />
                      <div className="info_box">
                        <p className="info_title">My wifi usage</p>
                        <p className="traffic">{rewards.times} times</p>
                      </div>
                    </div>
                    <div className="line"></div>
                    <div className="use">
                      <p className="icon point">P</p>
                      <div className="info_box">
                        <p className="info_title">You can get {rewards.point} Points!</p>
                        <Button className="more" onClick={onClickClaim}>Claim</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </SaidBar>
            </div>
        }
      </Layout>
    </div>
  );
};

export default WifiPoint;
