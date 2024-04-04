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
  const { connectMetamask, handleLogoutAndConnect } = useConnect()
  const exchangePoint = async () => {
    try {
      if (Number(swap.point) >= minPoint && Number(swap.point) <= maxPoint) {
        setPending(true)
        const data = await swapPoint({ point: Number(swap.point) })
        if (data[0]) {
          if (!data[0].error) {

            dispatch(setPoints(data[0].item.point))
            setSwap({
              point: data[0].item.point,
              coin: point * price
            })
          } else {
            alert(data[0].msg)
          }
        } else if ((data[1] && data[1].status_code === 401)) {
          handleLogoutAndConnect()
        }
        setPending(false)
      }
    } catch (error) {
      alert(error);
      setPending(false);
    }
  }
  const price = 1
  const point = useAppSelector(state => state.metamask.points)
  const minPoint = 1000;
  let maxPoint = 3000;
  const [swap, setSwap] = useState<{
    point: number | string,
    coin: number
  }>({
    point: Number(point) > maxPoint ? maxPoint : Number(point),
    coin: (point > maxPoint ? maxPoint : point) * price
  })

  const onChangeTicketNum = (e: React.ChangeEvent<HTMLInputElement>) => {
    const num = Number(e.target.value);
    if (num <= 0) {
      setSwap({ point: '', coin: 0 * price }); // Set point to an empty string
    } else if (num > point) {
      setSwap({ point: point, coin: point * price });
    } else if (num > maxPoint) {
      setSwap({ point: maxPoint, coin: maxPoint * price });
    } else {
      setSwap({ point: num, coin: num * price });
    }
  };
  useEffect(() => {
    connectMetamask()
    if (point <= 0) {
      setSwap({ point: 0, coin: 0 * price })
    } else if (point > maxPoint) {
      setSwap({ point: maxPoint, coin: maxPoint * price })
    } else {
      setSwap({ point: point, coin: point * price })
    }
    // eslint-disable-next-line
  }, [point])
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
                      max={maxPoint}
                      value={maxPoint >= Number(swap.point) ? swap.point : maxPoint}
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
                  {(Number(swap.point) < minPoint || point < minPoint) && <p className="message">Less than {`${minPoint}`} points cannot be exchanged</p>}
                  {(Number(swap.point) >= maxPoint) && <p className="message">More than {`${maxPoint}`} points cannot be exchanged</p>}
                  <Button className={`primary ${(Number(swap.point) < minPoint || Number(swap.point) > maxPoint) && "disabled"}`} onClick={exchangePoint}> Exchange Points </Button>
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
