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
  const { connectMetamask } = useConnect()

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
    try {
      if (account) {
        postPoint()
      } else {
        connectMetamask()
        postPoint()
      }
    } catch (error) {
      console.log(error)
    }

  }
  const postPoint = async () => {
    try {
      const [data] = await postEventPoint({ eventId: Number(id) })
      if (data && data.item && data.item.author) {
        dispatch(setPoints(data.item.author.point));
      } else {
        console.log("Data or its properties are null or undefined");
      }
      setReload(!reload)
    } catch (error) {
      console.log(error)
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
