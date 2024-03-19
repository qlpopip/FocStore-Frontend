import Layout from "components/organisms/Layout";
import { SaidBar, Navigator, Loader } from "components/molecules";
import { Button, Image } from "components/atoms";
import { getEvents, getEventPoints } from "./_api";
import { useEffect, useState } from "react";
import { EventType } from "dto";
import { useNavigate } from "react-router-dom";
import "./index.scss";
import { useAppSelector } from "share/redux/hook";
import IconsFile from "assets/icons";
import useConnect from "customHooks/useConnect";

interface HasEventType {
  id: number,
  event: EventType
}
const Event: React.FC = () => {

  const navigate = useNavigate()
  const [eventList, setEventList] = useState<EventType[]>([]);
  const [hasEventList, setHasEventList] = useState<HasEventType[]>([]);
  const [pending, setPending] = useState(false)
  const account = useAppSelector(state => state.metamask.account)
  const { handleLogoutAndConnect } = useConnect()
  useEffect(() => {
    async function fetchData() {
      try {
        setPending(true)
        const data = await getEvents();
        if (account) {
          const hasEvents = await getEventPoints()
          if (hasEvents[0]) {
            setHasEventList(hasEvents[0].items)
          } else if ((hasEvents[1] && hasEvents[1].status_code === 401)) {
            handleLogoutAndConnect()
          }
        }
        if (data[0]) {
          setEventList(data[0].items);
        } else if ((data[1] && data[1].status_code === 401)) {
          handleLogoutAndConnect()
        }
        setPending(false)
      } catch (error) {
        alert(error);
      }
    }
    fetchData();
    // eslint-disable-next-line
  }, []);

  const showIndexEvent = (id: number) => {
    navigate(`/event/${id}`)
  }

  return (
    <div>
      <Layout id="event">
        <Navigator navigation="Reward / Event" />
        <div className="event">
          <SaidBar>
            {pending ? <Loader /> :
              <div className="events_box">
                {eventList.map((item) => {
                  const hasEvent = hasEventList.some((hasEventItem) => hasEventItem.event.id === item.id);
                  return (
                    <div className="event" key={item.id} onClick={() => navigate(`/event/${item.id}`)}>
                      <Image src={item.img} alt="" className="event_img" />
                      <div className="event_main">
                        <div className="context_box">
                          <p className="name">{item.name.toUpperCase()}</p>
                          <p className="title">{item.title}</p>
                        </div>
                        <div className="btn_box">
                          {hasEvent && <Image src={IconsFile.Success} alt="" className="icon" />}
                          <Button className={`primary ${hasEvent && "disabled"}`} onClick={() => { showIndexEvent(item.id) }}>Get Point </Button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            }
          </SaidBar>
        </div>
      </Layout>
    </div>
  );
};

export default Event;
