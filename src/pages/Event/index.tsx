import Layout from "components/organisms/Layout";
import { SaidBar, Navigator, Loader } from "components/molecules";
import { Button, Image } from "components/atoms";
import { getEvents } from "./_api";
import { useEffect, useState } from "react";
import { EventType } from "dto";
import { useNavigate } from "react-router-dom";
import "./index.scss";


const Event: React.FC = () => {
  const navigate = useNavigate()
  const [eventList, setEventList] = useState<EventType[]>([]);
  const [pending, setPending] = useState(false)
  useEffect(() => {
    async function fetchData() {
      try {
        setPending(true)
        const [data] = await getEvents();
        setEventList(data.items);
        setPending(false)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData();
  }, []);

  const showIndexEvent = (id: number) => {
    navigate(`/event/${id}`)
  }

  return (
    <div>
      <Layout id="event">
        <Navigator navigation="Reward / WIFI Point" />
        <div className="event">
          <SaidBar>
            {pending ? <Loader /> :
              <div className="events_box">
                {eventList.map((item, index) => (
                  <div className="event" key={item.id}>
                    <Image src={item.img} alt="" className="event_img" />
                    <div className="event_main">
                      <div className="context_box">
                        <p className="name">{item.name.toUpperCase()}</p>
                        <p className="title">{item.title}</p>
                      </div>
                      <Button className="primary" onClick={() => { showIndexEvent(item.id) }}>Get Point </Button>
                    </div>
                  </div>
                ))}
              </div>
            }
          </SaidBar>
        </div>
      </Layout>
    </div>
  );
};

export default Event;
