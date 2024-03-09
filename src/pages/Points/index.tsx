import Layout from "components/organisms/Layout";
import { SaidBar, Navigator, Loader } from "components/molecules";
import "./index.scss";
import { Button, Image } from "components/atoms";
import ImagesFile from "assets/images";
import { useAppSelector } from "share/redux/hook";
import { shortenAddress } from "utils/shortenAddress";
import { Link, useNavigate } from "react-router-dom";
import { WEB3 } from "utils/configs";
import { useEffect, useState } from "react";
import { getHistory } from "./_api";
import useConnect from "customHooks/useConnect";

const Points: React.FC = () => {
  const account = useAppSelector((state) => state.metamask.account);
  const points = useAppSelector((state) => state.metamask.points);
  const navigate = useNavigate()
  const [pending, setPending] = useState(false)
  const { connectMetamask } = useConnect()
  interface HistoryType {
    point: number,
    pointName: string,
    created_at: string
  }
  const [historyList, setHistoryList] = useState<HistoryType[]>([])
  useEffect(() => {
    connectMetamask()
    // eslint-disable-next-line
  }, [])
  useEffect(() => {
    const fetchData = async () => {
      setPending(true)
      const [data] = await getHistory()
      setHistoryList(data.items)
      setPending(false)
    }
    account && fetchData()
  }, [account])
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);

    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);

    const formattedDate = `${year}.${month}.${day}`;
    return formattedDate
  }
  return (
    <div>
      <Layout id="my_points">
        <Navigator navigation="Reward / My Points" />
        {pending ? <Loader /> :
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
                    Points History {historyList.length === 0 && "Is Not Yet Available"}
                  </p>
                  <div className="history_box">
                    {account && historyList.length > 0 && historyList.map((item, index) => (
                      <div className="history_item" key={index}>

                        <div className="line"></div>
                        <div className="history">
                          <div className="point_history">
                            <p className="count_point">+ {item.point} P</p>
                            <p className="title">Reward {'>'} {item.pointName}</p>
                          </div>
                          <div className="date">{formatDate(item.created_at)}</div>
                        </div>
                      </div>
                    ))}
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
export default Points;
