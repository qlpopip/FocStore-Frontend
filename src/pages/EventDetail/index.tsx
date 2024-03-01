import Layout from "components/organisms/Layout";
import { SaidBar, Navigator, Loader } from "components/molecules";
import "./index.scss";
import { Button, Image } from "components/atoms";
import { getEvent } from "./_api";
import { useEffect, useState } from "react";
import { EventType } from "dto";
import { useParams } from "react-router-dom";
import IconsFile from "assets/icons";

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
                    <Button className="more">Connect to claim</Button>
                    <p className="description_title">Description</p>
                    <span className="description"
                      dangerouslySetInnerHTML={{ __html: event.description }} />
                    <div className="copy_box">
                      <div className="copy_link">
                        <p className="text">{event.name.toUpperCase()}</p>
                        <Image src={IconsFile.Link} alt="" className="icon" />
                      </div>
                      <Button className="more" >+{event.point} Points </Button>
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
