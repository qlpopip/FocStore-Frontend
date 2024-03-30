import { Navigator, Quantity } from "components/molecules";
import Layout from "components/organisms/Layout";
import { Button, Image } from "components/atoms";
import IconsFile from "assets/icons";
import { useAppDispatch, useAppSelector } from "share/redux/hook";
import { setOrders } from "share/redux/order";
import { Link, useNavigate } from "react-router-dom";
import "./index.scss";

const ShoppingCart: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const orders = useAppSelector((state) => state.order.orders);
  const IncrementProduct = (id: number) => {
    const updatedOrders = orders.map((order) => {
      if (order.product.id === id) {
        return { ...order, productCount: order.productCount + 1 };
      }
      return order;
    });
    dispatch(setOrders(updatedOrders));
  };

  const DecrementProduct = (id: number) => {
    const updatedOrders = orders.map((order) => {
      if (order.product.id === id && order.productCount > 1) {
        return { ...order, productCount: order.productCount - 1 };
      }
      return order;
    });
    dispatch(setOrders(updatedOrders));
  };

  const removeProduct = (id: number) => {
    const updatedOrders = orders.filter((order) => order.product.id !== id);
    dispatch(setOrders(updatedOrders));
  };
  const totalPrice = orders.reduce(
    (total, item) => total + item.product.productPrice * item.productCount,
    0
  );
  const returnShop = () => {
    navigate("/");
  };
  return (
    <Layout id="shopping_cart">
      <Navigator navigation="Shopping Cart" />
      {orders.length > 0 ? (
        <div className="shopping_container ">
          <div className="shopping_cart round-16">
            <p className="title"> Shopping Cart</p>
            <div className="table_header">
              <div className="products th">
                <p>PRODUCTS</p>
              </div>
              <div className="price th">
                <p>PRICE</p>
              </div>
              <div className="quantity th">
                <p>QUANTITY</p>
              </div>
              <div className="sub_total th">
                <p>SUB-TOTAL</p>
              </div>
            </div>
            {orders.length > 0 &&
              orders.map((item) => (
                <div className="table_body" key={item.product.id}>
                  <div className="remove">
                    <Image
                      src={IconsFile.Remove}
                      alt=""
                      onClick={() => {
                        removeProduct(item.product.id);
                      }}
                    />
                  </div>
                  <div className="img">
                    <Image src={item.product.img[0]} alt="" />
                  </div>
                  <div className="name">
                    {" "}
                    <span
                      className="description"
                      dangerouslySetInnerHTML={{
                        __html: item.product.description,
                      }}
                    />
                  </div>

                  <div className="price">
                    <p>
                      $
                      {item.product.productPrice.toLocaleString("en-US", {
                        style: "decimal",
                      })}
                    </p>
                  </div>
                  <div className="quantity">
                    <Quantity
                      count={item.productCount}
                      IncrementProduct={() => IncrementProduct(item.product.id)}
                      DecrementProduct={() => DecrementProduct(item.product.id)}
                    />
                  </div>
                  <div className="sub_total">
                    <p>${item.product.productPrice * item.productCount}</p>
                  </div>
                </div>
              ))}
            <div className="btn_box">
              <Button className="more" onClick={returnShop}>
                <div className="return_btn">
                  <Image src={IconsFile.ArrowBlue} className="arrow" />
                  <span>RETURN TO SHOP </span>
                </div>
              </Button>
              {/* <Button className="more" >
                UPDATE CART
              </Button> */}
            </div>
          </div>
          <div className="cart_total round-16">
            <div className="title_box">
              <p>Card Totals</p>
            </div>
            <div className="line"></div>
            <div className="totals">
              <p>Total</p>
              <p>
                $ {totalPrice.toLocaleString("en-US", { style: "decimal" })} USD
              </p>
            </div>
            <Button className="primary" onClick={() => navigate("/checkout")}>
              <div className="checkout_btn">
                <span>PROCEED TO CHECKOUT </span>
                <Image src={IconsFile.ArrowWhite} className="arrow" />
              </div>
            </Button>
          </div>
        </div>
      ) : (
        <div className="no_product">
          <h1>Your Cart Is Empty</h1>
          <Link to="/">
            <Button className="primary">FILL IT</Button>
          </Link>
        </div>
      )}
    </Layout>
  );
};

export default ShoppingCart;
