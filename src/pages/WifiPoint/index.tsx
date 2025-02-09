import Layout from "components/organisms/Layout";
import { EventSaidBar, Navigator, Loader } from "components/molecules";
import "./index.scss";
import { Button, Image } from "components/atoms";
import ImagesFile from "assets/images";
import { useEffect, useState } from "react";
import axios from "axios";
import { postWifiPoint } from "./_api";
import { useAppDispatch, useAppSelector } from "share/redux/hook";
import { setPoints } from "share/redux/metamask";
import useConnect from "customHooks/useConnect";

const WifiPoint: React.FC = () => {
  const dispatch = useAppDispatch();
  const account = useAppSelector((state) => state.metamask.account);
  const isPending = useAppSelector((state) => state.metamask.isPending);
  const [rewards, setRewards] = useState({
    times: 0,
    point: 0,
  });
  const [pending, setPending] = useState(false);
  async function getWifiPointHistory(
    walletAddress: string
  ): Promise<{ reward_token: number; reward_count: number }> {
    try {
      const response = await axios.post(
        "https://ad.focad.ph/APIs/WiFiConReward/",
        {
          coin_name: "FOC",
          datetime: 20240313121433,
          wallet_address: walletAddress,
          order_number: 6301903754,
        },
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      // eslint-disable-next-line
      if (response.data.status == "000") {
        return {
          reward_token: Number(response.data.reward_token),
          reward_count: Number(response.data.reward_count),
        };
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.response?.data);
      } else {
        console.error("Unexpected error:", error);
      }
    }
    return { reward_token: 0, reward_count: 0 };
  }

  // eslint-disable-next-line
  const fetchData = async () => {
    try {
      setPending(true);
      const response = await getWifiPointHistory(account || "");
      setRewards({
        times: response.reward_count,
        point: response.reward_token,
      });
      setPending(false);
    } catch (error) {
      setPending(false);
      alert(error);
    }
  };
  const { connectMetamask, handleLogoutAndConnect } = useConnect();
  useEffect(() => {
    connectMetamask().then(() => {
      //TODO: not sure if it is correct. Account can be null by this time
      account && isPending && fetchData();
    });

    // eslint-disable-next-line
  }, [account, isPending]);
  const onClickClaim = async () => {
    try {
      if (account && rewards.point > 0) {
        setPending(true);
        const data = await postWifiPoint(rewards);
        if (data[0]) {
          dispatch(setPoints(data[0].item.author.point));
          fetchData();
        } else if (data[1] && data[1].status_code === 401) {
          handleLogoutAndConnect();
        }
        setPending(false);
      }
    } catch (error) {
      setPending(false);
      alert(error);
    }
  };
  return (
    <div>
      <Layout id="daily-check-in">
        <Navigator navigation="WIFI Point" />
        {pending ? (
          <Loader />
        ) : (
          <div className="daily_check">
            <EventSaidBar>
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
                      <p className="traffic">{rewards.times} Times</p>
                    </div>
                  </div>
                  <div className="line"></div>
                  <div className="use">
                    <p className="icon point">P</p>
                    <div className="info_box">
                      <p className="info_title">
                        You can get {rewards.point} Points!
                      </p>
                      <Button className="more" onClick={onClickClaim}>
                        Claim
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </EventSaidBar>
          </div>
        )}
      </Layout>
    </div>
  );
};

export default WifiPoint;
