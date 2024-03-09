import Layout from "components/organisms/Layout";
import { SaidBar, Navigator, Loader } from "components/molecules";
import "./index.scss";
import { Button, Image } from "components/atoms";
import ImagesFile from "assets/images";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "share/redux/hook";
import useConnect from "customHooks/useConnect";
import { setPoints } from "share/redux/metamask";
import { swapPoint } from "./_api";

const Swap: React.FC = () => {
  const [pending, setPending] = useState(false)
  const dispatch = useAppDispatch()
  const exchangePoint = async () => {
    if (swap.point >= 1000) {
      setPending(true)
      const [data] = await swapPoint({ point: swap.point })
      dispatch(setPoints(data.item.point))
      setSwap({
        point: data.item.point,
        coin: point * price
      })
      setPending(false)
    }
  }
  const { connectMetamask } = useConnect()
  useEffect(() => {
    connectMetamask()
    // eslint-disable-next-line
  }, [])
  const price = 0.73670
  const point = useAppSelector(state => state.metamask.points)

  const [swap, setSwap] = useState({
    point: point,
    coin: point * price
  })


  const onChangeTicketNum = (e: React.ChangeEvent<HTMLInputElement>) => {
    const num = Number(e.target.value);
    if (num < 0) {
      setSwap({ point: 0, coin: 0 * price })
    } else if (num > point) {
      setSwap({ point: point, coin: point * price })
    } else {
      setSwap({ point: num, coin: num * price })
    }
  };
  return (
    <div>
      <Layout id="swap_points">
        <Navigator navigation="Reward / Swap Points" />
        <div className="swap_points">
          <SaidBar >
            {pending ? <Loader /> :
              <div className="points_box">
                <div className="swap_box">
                  <div className="point">
                    <Image src={ImagesFile.Point} className="coin_logo" />
                    <p className="title">POINT</p>
                    <Image src={ImagesFile.Vector} className="icon" />
                    <input
                      className="point_box"
                      type="number"
                      max={point}
                      value={swap.point}
                      onChange={(e) => onChangeTicketNum(e)}
                    />
                  </div>
                  <div className="swap">
                    <div className="line"></div>
                    <Image src={ImagesFile.Swap} className="swap_icon" />
                  </div>
                  <div className="point">
                    <Image src={ImagesFile.Force} className="coin_logo" />
                    <p className="title">FOC</p>
                    <Image src={ImagesFile.Vector} className="icon" />
                    <input className="point_box" value={swap.coin.toFixed(2)} type="number" name="coin" readOnly />
                  </div>
                </div>
                <div className="btn_box">
                  {(swap.point < 1000 || point < 1000) && <p className="message">Less than 1000 coins cannot be exchanged</p>}
                  <Button className={`primary ${(swap.point < 1000 || point < 1000) && "disabled"}`} onClick={exchangePoint}> Exchange Points </Button>
                </div>
              </div>
            }
          </SaidBar>
        </div>
      </Layout>
    </div>
  );
};
export default Swap;
