import { Button, Image } from "components/atoms";
import "./index.scss";
import Layout from "components/organisms/Layout";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProduct } from "./_api";
import { ProductType } from "dto";
import IconsFile from "assets/icons";
import { Navigator, Quantity } from "components/molecules";
import { useAppDispatch, useAppSelector } from "share/redux/hook";
import { setOrders } from "share/redux/order";
const initialProductState: ProductType = {
  name: '',
  description: '',
  productPrice: 0,
  img: [],
  id: 0,
};
const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch()
  const orders = useAppSelector((state) => state.order.orders);
  const [product, setProduct] = useState<ProductType>(initialProductState);
  const [pending, setPending] = useState(false)
  useEffect(() => {
    async function fetchData() {
      try {
        if (id) {
          setPending(true)
          const [data] = await getProduct(id);
          setProduct(data.item);
          setPending(false)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchData();
  }, [id]);
  const existingOrderIndex = orders.findIndex(order => order.product.id === Number(id));
  useEffect(() => {
    if (existingOrderIndex !== -1) {
      setCountProduct(orders[existingOrderIndex].productCount)
    }
    // eslint-disable-next-line
  }, [])
  const [countProduct, setCountProduct] = useState(1)
  const IncrementProduct = () => {
    setCountProduct(prev => prev + 1)
  }

  const DecrementProduct = () => {
    if (countProduct > 1) setCountProduct(prev => prev - 1)
  }

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
      dispatch(setOrders([...orders, { product: product, productCount: countProduct }]));
    }
  }
  const addToCard = () => {
    addProduct()
    navigate("/cart")

  }
  const buyNow = () => {
    addProduct()
    navigate("/checkout")
  }
  return (
    <div>
      <Layout id="product_detail">
        <Navigator navigation={product.name} />
        {pending ? <h1>Loading...</h1> :
          <div className="detail">
            <div className="img_box">
              <Image src={product.img[0]} alt="" className="big_img" />
              <div className="all_images">
                {product.img.map((img) => <Image src={img} key={img} alt="" className="small_img" />)}
              </div>
            </div>
            <div className="content_box">
              <h1>Detail</h1>
              <div className="content_main">
                <p className="description">{product.description}</p>
                <p className="price">${product.productPrice}</p>
              </div>
              <div className="button_box">
                <Quantity count={countProduct} IncrementProduct={IncrementProduct} DecrementProduct={DecrementProduct} />
                <Button className="primary" onClick={addToCard}> <div className="add_cart_btn"><span>ADD TO CARD</span> <Image src={IconsFile.Cart} />
                </div> </Button>
                <Button className="secondary" onClick={buyNow}>BUY NOW</Button>
              </div>
            </div>
          </div>
        }
      </Layout>
    </div>
  );
};

export default ProductDetail;
