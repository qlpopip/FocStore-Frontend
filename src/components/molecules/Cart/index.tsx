import IconsFile from "assets/icons"
import { Image } from "components/atoms"
import "./index.scss"
import { useAppSelector } from "share/redux/hook"

const CartComp: React.FC = () => {
    const orders = useAppSelector((state) => state.order.orders);

    const count = orders.reduce((accumulator, current) => accumulator + current.productCount, 0);

    return (
        <div className="cart_comp">
            <Image src={IconsFile.Cart} className="white" />
            {count > 0 && <div className="count_box">
                <p className="count">{count}</p>

            </div>}
        </div>
    )
}

export default CartComp