import Layout from "components/organisms/Layout";
import { SaidBar, Navigator, Loader } from "components/molecules";
import "./index.scss";
import { Button, Image } from "components/atoms";
import { getEvent, getEventPoint, postEventPoint } from "./_api";
import { useEffect, useState } from "react";
import { EventType } from "dto";
import { useParams } from "react-router-dom";
import IconsFile from "assets/icons";
import { useAppDispatch, useAppSelector } from "share/redux/hook";
import { connectWallet } from "share/redux/metamask/thunks";
import { setPoints } from "share/redux/metamask";

const initialEventState: EventType = {
  name: '',
  title: '',
  description: '',
  point: 0,
  img: '',
  id: 0,
};
const EventDetail: React.FC = () => {
  const { id } = useParams();
  const [event, setEvent] = useState<EventType>(initialEventState);
  const [pending, setPending] = useState(false)
  const account = useAppSelector(state => state.metamask.account)
  const dispatch = useAppDispatch();
  const [claimed, setClaimed] = useState(false)
  // const navigate = useNavigate()

  function isMobileDevice() {
    return 'ontouchstart' in window || 'onmsgesturechange' in window;
  }
  const connectMetamask = async () => {
    try {
      if (!account) {
        if (isMobileDevice()) {

          const dappUrl = process.env.REACT_APP_PUBLIC_API_URL || ''; // TODO enter your dapp URL. For example: https://uniswap.exchange. (don't enter the "https://")
          window.location.href = "https://metamask.app.link/dapp/" + dappUrl.split('//')[1] + '/trade'
        }
        dispatch(connectWallet())
      }
      // navigate("/my-points")
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    async function fetchData() {
      try {
        if (id) {
          setPending(true)
          const [data] = await getEvent(Number(id));

          setEvent(data.item);
          setPending(false)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchData();
  }, [id]);
  const [reload, setReload] = useState(false)
  useEffect(() => {
    async function fetchData() {
      try {
        if (id && account) {
          setPending(true)
          const [data] = await getEventPoint(Number(id))
          data.item && account ? setClaimed(true) : setClaimed(false)
          setPending(false)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchData();
    // eslint-disable-next-line
  }, [account, reload]);
  const getPoint = async () => {
    // !account && connectMetamask()
    if (account) {
      postPoint()
    } else {
      connectMetamask()
      postPoint()
    }
  }
  const postPoint = async () => {
    const [data] = await postEventPoint({ eventId: Number(id) })
    dispatch(setPoints(data.item.author.point))
    setReload(!reload)
  }
  return (
    <div>
      <Layout id="event_detail">
        <Navigator navigation="Reward / WIFI Point" />
        <div className="event_detail">
          <SaidBar>
            {pending ? <Loader /> :
              <div className="event_box">
                <div className="event" >
                  <Image src={event.img} alt="" className="event_img" />
                  <div className="event_main">
                    <p className="name">{event.name.toUpperCase()}</p>
                    <p className="title">{event.title}</p>
                    {!account && <Button className="more" onClick={connectMetamask}>Connect to claim</Button>}
                    <p className="description_title">Description</p>
                    <span className="description"
                      dangerouslySetInnerHTML={{ __html: event.description }} />
                    <div className="copy_box">
                      <div className="copy_link">
                        <p className="text">{event.name.toUpperCase()}</p>
                        <Image src={IconsFile.Link} alt="" className="icon" />
                      </div>
                      <div className="btn_box">
                        {claimed && <Image src={IconsFile.Success} alt="" className="icon" />}
                        <Button className={`more ${claimed && "claimed"}`} onClick={getPoint}>+{event.point} Points </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            }
          </SaidBar>
        </div>
      </Layout>
    </div>
  );
};

export default EventDetail;
