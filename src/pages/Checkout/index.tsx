import { Image } from "components/atoms";
import { Navigator } from "components/molecules";
import Layout from "components/organisms/Layout";
import "./index.scss"
import IconsFile from "assets/icons";
import { useAppSelector } from "share/redux/hook";
import { useState } from "react";

const Checkout: React.FC = () => {
    const orders = useAppSelector((state) => state.order.orders);
    const totalPrice = orders.reduce((total, item) => total + (item.product.productPrice * item.productCount), 0);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("clicked", info)
    };
    const [info, setInfo] = useState({
        first_name: "",
        last_name: "",
        custom_code: "",
        address: "",
        country: "",
        state: "",
        city: "",
        zip: "",
        email: "",
        phone: "",

    })
    const handleChange = (e:
        | React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setInfo(prevInfo => ({
            ...prevInfo,
            [name]: value // Dynamically set the property using the input's name attribute
        }));
    }
    return (
        <div>
            <Layout id="checkout">
                <Navigator navigation="Checkout" title="Shopping Card" path="/cart" />
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
                                <div className="country label">
                                    <label htmlFor="country">Country</label>
                                    <select name="country" id="country" value={info.country} onChange={handleChange} required>
                                        <option value="">Select a country</option>

                                        <option value="project">
                                            I'd like to start a project
                                        </option>
                                        <option value="question">I'd like to ask a question</option>
                                        <option value="proposal">I'd like to make a proposal</option>
                                    </select>
                                </div>
                                <div className="state label">
                                    <label htmlFor="state">Region/State</label>
                                    <select name="state" id="state" value={info.state}
                                        onChange={handleChange} required>
                                        <option value="">Select a Region</option>
                                        <option value="project">
                                            I'd like to start a project
                                        </option>
                                        <option value="question">I'd like to ask a question</option>
                                        <option value="proposal">I'd like to make a proposal</option>
                                    </select>
                                </div>
                                <div className="city label">
                                    <label htmlFor="city">City</label>
                                    <select name="city" id="city" value={info.city}
                                        onChange={handleChange} required>
                                        <option value="">Select a city</option>
                                        <option value="project">
                                            I'd like to start a project
                                        </option>
                                        <option value="question">I'd like to ask a question</option>
                                        <option value="proposal">I'd like to make a proposal</option>
                                    </select>
                                </div>
                                <div className="zip label" >
                                    <label htmlFor="zip">Zip Code</label>
                                    <input
                                        type="text"
                                        name="zip"
                                        id="zip"
                                        value={info.zip}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
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
                        </div>
                        <div className="orders_box">
                            <p className="title">Order Summery</p>
                            <div className="orders">
                                {orders.map((item) => (
                                    <div className="order" key={item.product.id}>
                                        <Image src={item.product.img[0]} alt="" className="order_img" />
                                        <div className="order_main">
                                            <p className="description">{item.product.description}</p>
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
                                <p >$ {totalPrice} USD </p>
                            </div>
                            <button className="primary" >
                                <div className="order_btn">
                                    <span>PLACE ORDER </span>
                                    <Image src={IconsFile.ArrowWhite} className="arrow" />
                                </div>
                            </button>
                        </div>
                    </form>
                </div>
            </Layout>
        </div>
    );
};

export default Checkout;

//Country
//Region/State
//City
//Zip Code