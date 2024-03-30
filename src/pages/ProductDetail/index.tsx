import { Button, Image } from "components/atoms";
import "./index.scss";
import Layout from "components/organisms/Layout";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProduct } from "./_api";
import { ProductType } from "dto";
import IconsFile from "assets/icons";
import { Loader, Navigator, Quantity } from "components/molecules";
import { useAppDispatch, useAppSelector } from "share/redux/hook";
import { setOrders } from "share/redux/order";
import useConnect from "customHooks/useConnect";
const initialProductState: ProductType = {
  name: "",
  description: "",
  productPrice: 0,
  img: [],
  id: 0,
};
const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { connectMetamask } = useConnect();
  const orders = useAppSelector((state) => state.order.orders);
  const [product, setProduct] = useState<ProductType>(initialProductState);
  const [pending, setPending] = useState(false);
  useEffect(() => {
    async function fetchData() {
      try {
        if (id) {
          setPending(true);
          const data = await getProduct(id);
          if (data[0] && !data[0].error) {
            setProduct(data[0].item);
          } else if (data[0] && data[0].error) {
            alert(data[0].msg);
          }
          setPending(false);
        }
      } catch (error) {
        alert(error);
      }
    }
    fetchData();
  }, [id]);
  const existingOrderIndex = orders.findIndex(
    (order) => order.product.id === Number(id)
  );
  useEffect(() => {
    if (existingOrderIndex !== -1) {
      setCountProduct(orders[existingOrderIndex].productCount);
    }
    // eslint-disable-next-line
  }, []);
  const [countProduct, setCountProduct] = useState(1);
  const IncrementProduct = () => {
    setCountProduct((prev) => prev + 1);
  };

  const DecrementProduct = () => {
    if (countProduct > 1) setCountProduct((prev) => prev - 1);
  };

  const addProduct = () => {
    if (existingOrderIndex !== -1) {
      const updatedOrders = orders.map((order, index) => {
        if (index === existingOrderIndex) {
          // Increment the productCount for this product
          return { ...order, productCount: countProduct };
        }
        return order;
      });
      dispatch(setOrders(updatedOrders));
    } else {
      // Product does not exist, add new product
      dispatch(
        setOrders([...orders, { product: product, productCount: countProduct }])
      );
    }
  };
  const addToCard = () => {
    addProduct();
    connectMetamask();
    navigate("/cart");
  };
  const buyNow = () => {
    addProduct();
    connectMetamask();
    navigate("/checkout");
  };
  const [imgIndex, setImgIndex] = useState(0);
  const nextImg = () => {
    if (imgIndex < product.img.length - 1) {
      setImgIndex((prev) => prev + 1);
    }
  };
  const prevImg = () => {
    if (imgIndex > 0) {
      setImgIndex((prev) => prev - 1);
    }
  };
  return (
    <div>
      <Layout id="product_detail">
        <Navigator navigation={product.name} />
        {pending ? (
          <Loader />
        ) : (
          <div className="detail">
            <div className="img_box">
              <img src={product.img[imgIndex]} alt="" className="big_img" />
              {product.img.length > 1 && (
                <div className="all_images">
                  <Image
                    src={IconsFile.ArrowWhite}
                    className="arrow"
                    onClick={prevImg}
                  />
                  {product.img.map((img, index) => (
                    <Image
                      src={img}
                      onClick={() => setImgIndex(index)}
                      key={img}
                      alt=""
                      className={`small_img ${
                        index === imgIndex && "active_img"
                      }`}
                    />
                  ))}
                  <Image
                    src={IconsFile.ArrowWhite}
                    className="arrow right"
                    onClick={nextImg}
                  />
                </div>
              )}
            </div>
            <div className="content_box">
              <h1>{product.name}</h1>
              <div className="content_main">
                <span
                  className="description"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
                <p className="price">
                  $
                  {product.productPrice.toLocaleString("en-US", {
                    style: "decimal",
                  })}
                </p>
              </div>
              <div className="button_box">
                <Quantity
                  count={countProduct}
                  IncrementProduct={IncrementProduct}
                  DecrementProduct={DecrementProduct}
                />
                <Button className="primary" onClick={addToCard}>
                  {" "}
                  <div className="add_cart_btn">
                    <span>ADD TO CARD</span> <Image src={IconsFile.Cart} />
                  </div>{" "}
                </Button>
                <Button className="secondary" onClick={buyNow}>
                  BUY NOW
                </Button>
              </div>
            </div>
          </div>
        )}
      </Layout>
    </div>
  );
};

export default ProductDetail;
