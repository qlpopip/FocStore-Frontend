import Layout from "components/organisms/Layout";
import { SaidBar, Navigator } from "components/molecules";
import "./index.scss";
import { Button, Image } from "components/atoms";
import ImagesFile from "assets/images";


const WifiPoint: React.FC = () => {
  return (
    <div>
      <Layout id="daily-check-in">
        <Navigator navigation="Reward / WIFI Point" />
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
                    <p className="traffic">3.7 GB</p>
                  </div>
                </div>
                <div className="line"></div>
                <div className="use">
                  <p className="icon point">P</p>
                  <div className="info_box">
                    <p className="info_title">You can get 432 Points!</p>
                    <Button className="more">Claim</Button>
                  </div>
                </div>
              </div>
            </div>
          </SaidBar>
        </div>
      </Layout>
    </div>
  );
};

export default WifiPoint;
