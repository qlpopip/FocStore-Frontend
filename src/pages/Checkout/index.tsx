import { Button, Image, InputChoose } from "components/atoms";
import { Loader, Navigator } from "components/molecules";
import Layout from "components/organisms/Layout";
import IconsFile from "assets/icons";
import { useAppDispatch, useAppSelector } from "share/redux/hook";
import { useEffect, useState } from "react";
import ImagesFile from "assets/images";
import axios from "axios";
import "./index.scss"
import { CreateOrderType, createOrder } from "./_api";
import { Link, useNavigate } from "react-router-dom";
import { useDaumPostcodePopup } from 'react-daum-postcode';
import { sendTokens } from "../../share/redux/metamask/thunks";
import useConnect from "customHooks/useConnect";
interface CryptoData {
    USDT: {
        usd: number;
    };
    FOC: {
        usd: number;
    };
    ETH: {
        usd: number;
    };
}
const Checkout: React.FC = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const account = useAppSelector(state => state.metamask.account)
    const orders = useAppSelector((state) => state.order.orders);
    const totalPrice = orders.reduce((total, item) => total + (item.product.productPrice * item.productCount), 0);
    const [pending, setPending] = useState(false)
    const { connectMetamask, handleLogoutAndConnect } = useConnect()
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (account) {
                setPending(true)
                info.totalPrice = info.totalPrice.toString()
                const data = await createOrder(info)
                if (data[0]) {
                    const handlePaymentSuccess = () => {
                        setPending(false);
                        navigate("/orders")
                    }
                    dispatch(sendTokens({ amount: Number(info.totalPrice).toFixed(6), currency: sort, navigate: handlePaymentSuccess }))

                } else if ((data[1] && data[1].status_code === 401)) {
                    handleLogoutAndConnect()
                }
            }
        } catch (error) {
            alert(error);
            setPending(false);
        }
    };
    const products = orders.map(item => (
        {
            productId: item.product.id,
            quantity: item.productCount
        }
    ))
    const [sort, setSort] = useState<'ETH' | 'FOC' | 'USDT'>("FOC");
    const [coins, setCoins] = useState<CryptoData>({
        USDT: {
            usd: 0
        },
        FOC: {
            usd: 0
        },
        ETH: {
            usd: 0
        },
    });
    const exchangedTotalPrice = ((totalPrice / coins[sort as keyof CryptoData]?.usd));
    const [info, setInfo] = useState<CreateOrderType>({
        status: "PENDING",
        totalPrice: exchangedTotalPrice,
        priceType: sort,
        products: products,
        first_name: "",
        last_name: "",
        custom_code: "",
        address: "",
        road_address: "",
        others: "",
        zip_code: "",
        email: "",
        phone: "",
    })

    const handleChange = (e:
        | React.ChangeEvent<HTMLInputElement>
        | { name: string; value: string }
    ) => {
        let name: any, value: any;

        if ('target' in e) {
            ({ name, value } = e.target);
        } else {
            ({ name, value } = e);
        }
        setInfo(prevInfo => ({
            ...prevInfo,
            [name]: value
        }));
        if (name === "zip_code" && value !== "") {
            setInfo(prevInfo => ({
                ...prevInfo,
                zip_code: Number(value)
            }));
        }
        if (name === "zip_code" && value === "") {
            setInfo(prevInfo => ({
                ...prevInfo,
                zip_code: ""
            }));
        }
        if (name === "sort") {
            setSort(value);
            setInfo(prevInfo => ({
                ...prevInfo,
                priceType: (value)
            }));
        }
    }
    useEffect(() => {
        setInfo(prevInfo => ({
            ...prevInfo,
            totalPrice: exchangedTotalPrice
        }));
    }, [exchangedTotalPrice])
    const onChangeToken = (name: string, value: string) => {
        handleChange({ name, value });
    }


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    "https://api.coingecko.com/api/v3/simple/price",
                    {
                        params: {
                            ids: "ethereum,force",
                            vs_currencies: "usd",
                        },
                    }
                );
                setCoins({
                    USDT: { usd: 1 },
                    FOC: { usd: response.data.force?.usd ?? 0 },
                    ETH: { usd: response.data.ethereum?.usd ?? 0 },
                });
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
        connectMetamask()
        // eslint-disable-next-line
    }, []);

    const open = useDaumPostcodePopup();
    const handleComplete = (data: any) => {
        // Display the address according to the road name address display rules.
        // If the variable coming down is empty, it takes a value of an empty string (''), so branch off considering this.
        const roadAddress = data.roadAddress; // Road name address variable
        const zonecode = data.zonecode; // Postal code variable
        let extraRoadAddress = ''; // Reference item variable


        // If there is a legal dong name, add it. (Legal ri is excluded)
        // For legal dong, the last character ends with "dong/ro/ga".
        if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
            extraRoadAddress += data.bname;
        }
        // If there is a building name and it is an apartment, add it.
        if (data.buildingName !== '' && data.apartment === 'Y') {
            extraRoadAddress += (extraRoadAddress !== '' ? ', ' + data.buildingName : data.buildingName);
        }
        // If there are reference items to display, create the final string including the parentheses.
        if (extraRoadAddress !== '') {
            extraRoadAddress = ' (' + extraRoadAddress + ')';
        }
        setInfo({
            ...info, zip_code: Number(zonecode), address: (roadAddress + " " + extraRoadAddress)
        })
        console.log(roadAddress, extraRoadAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
        console.log(zonecode); // e.g. '04794'
        // TODO: 
        // 1. Display roadAddress, extraRoadAddress, and zonecode in the input fields
        // 2.Prompt additional address input for the Other section
        //      Other section is where user enters the building number, floor, etc.
    };

    const handleClick = () => {
        open({ onComplete: handleComplete });
    };
    return (
        <div>
            <Layout id="checkout">
                <Navigator navigation="Checkout" title="Shopping Card" path="/cart" />
                {pending ?
                    <Loader /> :

                    <>
                        {orders.length > 0 ?
                            <div className="checkout_box">
                                <form id="contact_form" onSubmit={handleSubmit}>
                                    <div className="left_side">
                                        <p className="title"> Billing Information</p>
                                        <div className="first">
                                            <div className="first_name label">
                                                <label htmlFor="name">User name</label>
                                                <input
                                                    type="text"
                                                    placeholder="First name"
                                                    name="first_name"
                                                    id="first_name"
                                                    value={info.first_name}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                            <div className="last_name">
                                                <input
                                                    type="text"
                                                    placeholder="Last name"
                                                    name="last_name"
                                                    id="last_name"
                                                    value={info.last_name}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                            <div className="custom_code label">
                                                <label htmlFor="custom_code">Personal Custom Code</label>
                                                <input
                                                    type="text"
                                                    name="custom_code"
                                                    id="custom_code"
                                                    value={info.custom_code}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="address label">
                                            <label htmlFor="address">Address</label>
                                            <input
                                                type="text"
                                                name="address"
                                                id="address"
                                                value={info.address}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="third">
                                            <div className="zip label" >
                                                <label htmlFor="zip_code">Zip Code</label>
                                                <input
                                                    type="number"
                                                    name="zip_code"
                                                    id="zip_code"
                                                    className="inp"
                                                    value={info.zip_code}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                            <div className="state label">
                                                <label htmlFor="road_address">Additional Road</label>
                                                <input name="road_address" id="road_address" value={info.road_address}
                                                    onChange={handleChange} required>
                                                </input>
                                            </div>
                                            <div className="city label">
                                                <label htmlFor="others">Other</label>
                                                <input name="others" id="others" value={info.others}
                                                    onChange={handleChange} >
                                                </input>
                                            </div>
                                            <Button type='button' className="secondary" onClick={handleClick}>Search</Button>

                                        </div>
                                        <div className="fourth">
                                            <div className="email label">
                                                <label htmlFor="email">Email</label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    id="email"
                                                    value={info.email}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                            <div className="phone label">
                                                <label htmlFor="phone">Phone Number</label>
                                                <input
                                                    type="text"
                                                    name="phone"
                                                    id="phone"
                                                    value={info.phone}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="payment_box">
                                            <p className="title"> Payment Option</p>
                                            <div className="token_box">
                                                <div className="token" onClick={() => onChangeToken("sort", "FOC")}>
                                                    <div className="img_box">
                                                        <p>FOC Token</p>
                                                    </div>
                                                    <InputChoose type="radio" name="sort" id="FOC"
                                                        checked={sort === "FOC"} value={"FOC"}
                                                        onChange={handleChange}
                                                        className="choose_coin" />
                                                </div>
                                                <div className="line"></div>
                                                <div className="token" onClick={() => onChangeToken("sort", "USDT")}>
                                                    <div className="img_box">
                                                        <Image src={ImagesFile.Tether} className="coin_image" />
                                                    </div>
                                                    <InputChoose type="radio" name="sort" id="USDT"
                                                        checked={sort === "USDT"} value={"USDT"}
                                                        onChange={handleChange}
                                                        className="choose_coin" />
                                                </div>
                                                <div className="line"></div>
                                                <div className="token" onClick={() => onChangeToken("sort", "ETH")}>
                                                    <div className="img_box">
                                                        <Image src={ImagesFile.Ethereum} className="coin_image" />
                                                    </div>
                                                    <InputChoose type="radio" name="sort" id="ETH"
                                                        checked={sort === "ETH"} value={"ETH"}
                                                        onChange={handleChange}
                                                        className="choose_coin"
                                                    />
                                                </div>
                                            </div>
                                            <p className="title"> Price</p>
                                            <div className="price_box">
                                                {exchangedTotalPrice.toLocaleString('en-US', { style: 'decimal' })}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="orders_box">
                                        <p className="title">Order Summery</p>
                                        <div className="orders">
                                            {orders.map((item) => (
                                                <div className="order" key={item.product.id}>
                                                    <Image src={item.product.img[0]} alt="" className="order_img" />
                                                    <div className="order_main">
                                                        {/* <p className="description">{item.product.description}</p> */}
                                                        <span className="description"
                                                            dangerouslySetInnerHTML={{ __html: item.product.description }} />
                                                        <div className="product_count">
                                                            <p>{item.productCount} x &nbsp;  </p>
                                                            <p className="price"> ${item.product.productPrice}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="line"></div>
                                        <div className="total_order">
                                            <p>Total</p>
                                            <p >$ {totalPrice.toLocaleString('en-US', { style: 'decimal' })} USDT </p>
                                        </div>
                                        <button className="primary" >
                                            <div className="order_btn">
                                                <span>PLACE ORDER </span>
                                                <Image src={IconsFile.ArrowWhite} className="arrow" />
                                            </div>
                                        </button>
                                    </div>
                                </form>
                            </div> :
                            <div className="no_product">
                                <h1>Your Cart Is Empty</h1>
                                <Link to="/">
                                    <Button className="primary">FILL IT</Button>
                                </Link>
                            </div>
                        }
                    </>
                }
            </Layout>
        </div>
    );
};

export default Checkout;