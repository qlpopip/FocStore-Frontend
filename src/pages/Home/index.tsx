import { Image } from "components/atoms";
import "./index.scss";
import Layout from "components/organisms/Layout";
import IconsFile from "assets/icons";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loader, Pagination } from "components/molecules";
import { getProducts } from "./_api";
import { ProductType } from "dto";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const onclickPreview = (img: string) => {
    setImgView(img);
    setShowImgView(true);
  };
  const removeImage = () => {
    setImgView("");
    setShowImgView(false);
  };
  const [imgView, setImgView] = useState("");
  const [showImgView, setShowImgView] = useState(false);
  const [productList, setProductList] = useState<ProductType[]>([]);
  const [totalPage, setTotalPage] = useState(0);

  const [totalCount, setTotalCount] = useState(0);
  const [pending, setPending] = useState(false);
  useEffect(() => {
    async function fetchData() {
      try {
        setPending(true);
        const data = await getProducts(1, 8);
        if (data[0]) {
          setProductList(data[0].items);
          setTotalPage(data[0].totalPage);
          setTotalCount(data[0].totalCount);
        }
        setPending(false);
      } catch (error) {
        alert(error);
      }
    }
    fetchData();
  }, []);
  const [step, setStep] = useState(0);
  const pagination = async (page: number) => {
    try {
      setPending(true);
      const data = await getProducts(page, 8);
      if (data[0]) {
        setProductList(data[0].items);
      }
      setStep(page - 1);
      setPending(false);
    } catch (error) {
      alert(error);
    }
  };
  return (
    <div>
      <Layout id="home_page">
        {pending ? (
          <Loader />
        ) : (
          <div className="main">
            <div className="table">
              {productList.map((item) => (
                <div className="card round-16" key={item.id}>
                  <div className="img_box">
                    <div className="bg"></div>
                    <div
                      className="ant-image-mask"
                      onClick={() => onclickPreview(item.img[0])}
                    >
                      <div className="ant-image-mask-info">
                        <span
                          role="img"
                          aria-label="eye"
                          className="anticon anticon-eye"
                        >
                          <Image src={IconsFile.Eye} alt="" />
                        </span>
                        Preview
                      </div>
                    </div>
                    <Image src={item.img[0]} alt="" />
                  </div>
                  <div
                    className="card_main"
                    onClick={() => navigate(`product/${item.id}`)}
                  >
                    <div className="description">
                      <p>{item.name}</p>
                    </div>
                    <Link to={`/product/${item.id}`} className="price">
                      $
                      {item.productPrice.toLocaleString("en-US", {
                        style: "decimal",
                      })}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            {showImgView && (
              <div className="overView" onClick={removeImage}>
                <Image src={imgView} alt="" className="img" />
              </div>
            )}
            {totalCount > 8 && (
              <Pagination
                totalPage={totalPage > 0 ? totalPage : 0}
                currentPage={step + 1}
                onClickPage={pagination}
              />
            )}
          </div>
        )}
      </Layout>
    </div>
  );
};

export default Home;
