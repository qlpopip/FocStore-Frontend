import Layout from "components/organisms/Layout";
import { SaidBar, Navigator } from "components/molecules";
import "./index.scss";
import { Button, Image } from "components/atoms";
import ImagesFile from "assets/images";

const Swap: React.FC = () => {
  const exchangePoint = () => {
  }
  return (
    <div>
      <Layout id="swap_points">
        <Navigator navigation="Reward / Swap Points" />
        <div className="swap_points">
          <SaidBar >
            <div className="points_box">
              <div className="swap_box">
                <div className="point">
                  <Image src={ImagesFile.Point} className="coin_logo" />
                  <p className="title">POINT</p>
                  <Image src={ImagesFile.Vector} className="icon" />
                  <div className="point_box">
                    <p>1000.00</p>
                  </div>
                </div>
                <div className="swap">
                  <div className="line"></div>
                  <Image src={ImagesFile.Swap} className="swap_icon" />
                </div>
                <div className="point">
                  <Image src={ImagesFile.Force} className="coin_logo" />
                  <p className="title">FOC</p>
                  <Image src={ImagesFile.Vector} className="icon" />
                  <div className="point_box">
                    <p>736.70</p>
                  </div>
                </div>
              </div>
              <Button className="primary" onClick={exchangePoint}> Exchange Points </Button>
            </div>
          </SaidBar>
        </div>
      </Layout>
    </div>
  );
};
export default Swap;
