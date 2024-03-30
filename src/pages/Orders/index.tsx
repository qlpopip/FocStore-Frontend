import { Loader, Navigator, SaidBar } from "components/molecules";
import Layout from "components/organisms/Layout";
import { Button, Image } from "components/atoms";
import IconsFile from "assets/icons";
import { Link, useNavigate } from "react-router-dom";
import "./index.scss";
import { useEffect, useState } from "react";
import { OrderStatusType } from "dto/orderDto";
import { getOrders } from "./_api";
import useConnect from "customHooks/useConnect";
import { useAppSelector } from "share/redux/hook";

const Orders: React.FC = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<OrderStatusType[]>([]);
  const [pending, setPending] = useState(false);
  const { connectMetamask, handleLogoutAndConnect } = useConnect();
  const account = useAppSelector((state) => state.metamask.account);
  const isPending = useAppSelector((state) => state.metamask.isPending);
  useEffect(() => {
    async function fetchData() {
      try {
        if (account && isPending) {
          setPending(true);
          const data = await getOrders();
          if (data[0]) {
            setOrders(data[0].items);
          } else if (data[1] && data[1].status_code === 401) {
            handleLogoutAndConnect();
          }
          setPending(false);
        }
      } catch (error) {
        alert(error);
        setPending(false);
      }
    }
    fetchData();
    connectMetamask();
    // eslint-disable-next-line
  }, [account, isPending]);

  const [showOrder, setShowOrder] = useState({
    index: 0,
    status: false,
  });

  const statusColors = {
    PENDING: "#FFA500", // Orange
    DELIVERED: "#008000", // Green
    PROCESSING: "#FFFF00", // Yellow
    SHIPPED: "#0000FF", // Blue
    CANCELLED: "#FF0000", // Red
    RETURNED: "#A52A2A", // Brown
    FAILED: "#FF4500", // OrangeRed
    COMPLETED: "#32CD32", // LimeGreen
  };
  const colorsBorder = (status: string) => {
    const statusColor = statusColors[status as keyof typeof statusColors];
    return statusColor;
  };
  const onClickOpenOrder = (id: number) => {
    if (showOrder.index === id) {
      setShowOrder({ ...showOrder, status: !showOrder.status });
    } else {
      setShowOrder({ index: id, status: true });
    }
  };
  return (
    <Layout id="order_page">
      <Navigator navigation="Orders" />
      {pending ? (
        <Loader />
      ) : orders.length > 0 ? (
        <SaidBar>
          <div className="order_container ">
            {orders.map((order) => (
              <div
                className={`checkout_box ${
                  showOrder.index === order.id && showOrder.status && "open"
                }`}
                style={{ border: `2px solid ${colorsBorder(order.status)}` }}
                key={order.id}
              >
                <div
                  className="title_box"
                  onClick={() => onClickOpenOrder(order.id)}
                >
                  <p className="title">
                    {" "}
                    Order Information status - {order.status}{" "}
                  </p>
                  <Image
                    src={IconsFile.ArrowSub}
                    alt=""
                    className="title_icon"
                  />
                </div>
                <div className="orders_box">
                  <div className="left_side">
                    <div className="main_box">
                      <p className="title">First Name</p>
                      <p className="text">{order.first_name} </p>
                    </div>
                    <div className="main_box">
                      <p className="title">Last Name</p>
                      <p className="text">{order.last_name} </p>
                    </div>
                    <div className="main_box">
                      <p className="title">Personal Custom Code</p>
                      <p className="text">{order.custom_code} </p>
                    </div>
                    <div className="main_box">
                      <p className="title">Address</p>
                      <p className="text">{order.address} </p>
                    </div>
                    <div className="main_box">
                      <p className="title">road_address</p>
                      <p className="text">{order.road_address} </p>
                    </div>
                    {order.others && (
                      <div className="main_box">
                        <p className="title">others</p>
                        <p className="text">{order.others} </p>
                      </div>
                    )}
                    <div className="main_box">
                      <p className="title">Zip Code</p>
                      <p className="text">{order.zip_code} </p>
                    </div>
                    <div className="main_box">
                      <p className="title">Email</p>
                      <p className="text">{order.email} </p>
                    </div>
                    <div className="main_box">
                      <p className="title">Phone Number</p>
                      <p className="text">{order.phone} </p>
                    </div>
                    <div className="main_box">
                      <p className="title">Order status</p>
                      <p className="text">{order.status.toLowerCase()} </p>
                    </div>
                  </div>
                  <div className="order_box">
                    <p className="title">Order Summery</p>
                    <div className="orders">
                      {order.orderProducts.map((item) => (
                        <div
                          className="order"
                          key={item.id}
                          onClick={() =>
                            navigate(`/product/${item.product.id}`)
                          }
                        >
                          <Image
                            src={item.product.img[0]}
                            alt=""
                            className="order_img"
                          />
                          <div className="order_main">
                            <span
                              className="description"
                              dangerouslySetInnerHTML={{
                                __html: item.product.description,
                              }}
                            />
                            <div className="product_count">
                              <p>{item.quantity} x &nbsp; </p>
                              <p className="price">
                                {" "}
                                $
                                {item.product.productPrice.toLocaleString(
                                  "en-US",
                                  {
                                    style: "decimal",
                                  }
                                )}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="line"></div>
                    <div className="total_order">
                      <p>Total</p>
                      <p>
                        {" "}
                        {Number(order.totalPrice).toLocaleString("en-US", {
                          style: "decimal",
                        })}{" "}
                        {order.priceType}{" "}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </SaidBar>
      ) : (
        <div className="no_product">
          <h1>Your Orders Is Empty</h1>
          <Link to="/">
            <Button className="primary">FILL IT</Button>
          </Link>
        </div>
      )}
    </Layout>
  );
};

export default Orders;
