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
import { setPoints } from "share/redux/metamask";
import useConnect from "customHooks/useConnect";

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
  const { connectMetamask, handleLogoutAndConnect } = useConnect()

  useEffect(() => {
    async function fetchData() {
      try {
        if (id) {
          setPending(true)
          const data = await getEvent(Number(id));
          if (data[0] && !data[0].error) {
            setEvent(data[0].item);
          } else if ((data[1] && data[1].status_code === 401)) {
            handleLogoutAndConnect()
          } else if (data[0] && data[0].error) {
            alert(data[0].msg)
          }
          setPending(false)
        }
      } catch (error) {
        alert(error);
      }
    }
    fetchData();
    // eslint-disable-next-line
  }, [id]);
  const [reload, setReload] = useState(false)
  const isPending = useAppSelector((state) => state.metamask.isPending);
  useEffect(() => {
    async function fetchData() {
      try {
        if (id && account && isPending) {
          setPending(true)
          const data = await getEventPoint(Number(id))
          if (data[0]) {
            data[0].item && account ? setClaimed(true) : setClaimed(false)
          } else if ((data[1] && data[1].status_code === 401)) {
            handleLogoutAndConnect()
          }
          setPending(false)
        }
      } catch (error) {
        alert(error);
      }
    }
    fetchData();
    // eslint-disable-next-line
  }, [account, reload, isPending]);
  const getPoint = async () => {
    try {
      if (account && isPending) {
        !claimed && postPoint()
      } else {
        connectMetamask()
        isPending && postPoint()
      }
    } catch (error) {
      alert(error);
    }

  }
  const postPoint = async () => {
    try {
      const data = await postEventPoint({ eventId: Number(id) })
      if (data[0]) {
        if (data && data[0].item && data[0].item.author) {
          dispatch(setPoints(data[0].item.author.point));
        } else {
          console.log("Data or its properties are null or undefined");
        }
      } else if ((data[1] && data[1].status_code === 401)) {
        handleLogoutAndConnect()
      }
      setReload(!reload)
    } catch (error) {
      alert(error);
    }
  }
  return (
    <div>
      <Layout id="event_detail">
        <Navigator navigation={`Reward / Event / ${event.name.slice(0, 1).toUpperCase() + event.name.slice(1)}`} />
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
