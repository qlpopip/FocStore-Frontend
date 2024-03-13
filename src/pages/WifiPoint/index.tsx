import Layout from "components/organisms/Layout";
import { SaidBar, Navigator, Loader } from "components/molecules";
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
  const dispatch = useAppDispatch()
  const account = useAppSelector(state => state.metamask.account)
  const [rewards, setRewards] = useState({
    times: 37,
    point: 412
  })
  const [pending, setPending] = useState(false);
  async function getWifiPointHistory(
      walletAddress: string,
): Promise<{ reward_token: number; reward_count: number }> {
    try {
      const response = await axios.post(
          'https://ad.focad.ph/APIs/WiFiConReward/',
          {
            coin_name: 'FOC',
            datetime: 20240313121433,
            wallet_address: walletAddress,
            order_number: 6301903754,
          },
          { headers: { 'Content-Type': 'multipart/form-data' } },
      );
      console.log(response.data); // Process the response as needed
      if (response.data.status == '000') {
    return {
      reward_token: Number(response.data.reward_token),
      reward_count: Number(response.data.reward_count),
    };
  }
} catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.response?.data);
    } else {
      console.error('Unexpected error:', error);
    }
  }
    return { reward_token: 0, reward_count: 0 };
}

  // eslint-disable-next-line
  const fetchData = async () => {
    try {
      setPending(true)
      const response = await getWifiPointHistory(account || "");
      setRewards({
        times: response.reward_count,
        point: response.reward_token,
      });
      setPending(false)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const { connectMetamask } = useConnect()
  useEffect(() => {
    connectMetamask().then(() => {
        //TODO: not sure if it is correct. Account can be null by this time
        fetchData();
    })

    // eslint-disable-next-line
  }, [])
  const onClickClaim = async () => {
    if (account) {
      setPending(true)
      const [data] = await postWifiPoint(rewards)
      // fetchData();
      dispatch(setPoints(data.item.author.point))
      setPending(false)
    }
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
