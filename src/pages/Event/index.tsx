import Layout from "components/organisms/Layout";
import { SaidBar, Navigator, Loader } from "components/molecules";
import { Button, Image } from "components/atoms";
import { getEvents, getEventPoints } from "./_api";
import { useEffect, useState } from "react";
import { EventType } from "dto";
import { useNavigate } from "react-router-dom";
import "./index.scss";
import { useAppSelector } from "share/redux/hook";

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
  useEffect(() => {
    async function fetchData() {
      try {
        setPending(true)
        const [data] = await getEvents();
        if (account) {
          const hasEvents = await getEventPoints()
          setHasEventList(hasEvents[0].items)
        }

        setEventList(data.items);
        setPending(false)
      } catch (error) {
        console.log(error)
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
                        <Button className={`primary ${hasEvent && "disabled"}`} onClick={() => { showIndexEvent(item.id) }}>Get Point </Button>
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
