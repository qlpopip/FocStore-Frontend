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
  const navigate = useNavigate()
  const onclickPreview = (img: string) => {
    setImgView(img)
    console.log("da")
    setShowImgView(true)
  }
  const removeImage = () => {
    setImgView("")
    setShowImgView(false)
  }
  const [imgView, setImgView] = useState("")
  const [showImgView, setShowImgView] = useState(false)
  const [productList, setProductList] = useState<ProductType[]>([]);
  const [totalPage, setTotalPage] = useState(0);

  const [totalCount, setTotalCount] = useState(0);
  const [pending, setPending] = useState(false)
  useEffect(() => {
    async function fetchData() {
      try {
        setPending(true)
        const [data] = await getProducts(1, 8);
        setProductList(data.items);
        setTotalPage(data.totalPage);
        setTotalCount(data.totalCount);
        setPending(false)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData();
  }, []);
  const [step, setStep] = useState(0);
  const pagination = async (page: number) => {
    const [data] = await getProducts(page, 8);
    setProductList(data.items);
    setStep(page - 1);
  };
  return (
    <div>
      <Layout id="home_page">
        {pending ? <Loader /> :
          <div className="main">
            <div className="table">
              {productList.map((item) => (
                <div className="card round-3" key={item.id} >
                  <div className="img_box">
                    <div className="bg"></div>
                    <div className="ant-image-mask" onClick={() => onclickPreview(item.img[0])}>
                      <div className="ant-image-mask-info">
                        <span role="img" aria-label="eye" className="anticon anticon-eye">
                          <Image src={IconsFile.Eye} alt="" />
                        </span>Preview
                      </div>
                    </div>
                    <Image
                      src={item.img[0]}
                      alt=""
                    />
                  </div>
                  <div className="card_main" onClick={() => navigate(`product/${item.id}`)}>
                    <div className="description">
                      <span dangerouslySetInnerHTML={{ __html: item.description }} />
                    </div>
                    <Link to={`/product/${item.id}`} className="price">${item.productPrice}</Link>
                  </div>
                </div>
              ))}
            </div>
            {showImgView &&
              <div className="overView" onClick={removeImage}>
                <Image src={imgView} alt="" className="img" />
              </div>
            }
            {totalCount > 8 && <Pagination totalPage={totalPage > 0 ? totalPage : 0}
              currentPage={step + 1} onClickPage={pagination} />}
          </div>
        }
      </Layout>
    </div>
  );
};

export default Home;
