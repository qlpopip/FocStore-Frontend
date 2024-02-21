import IconsFile from "assets/icons"
import { Image } from "components/atoms"
import { QuantityProps } from "./interface"
import "./index.scss"

const QuantityComp: React.FC<QuantityProps> = (props) => {
    const { count, IncrementProduct, DecrementProduct, className } = props

    return (
        <div className="quantity_box round-3">
            <div onClick={DecrementProduct} className={`quality_icon ${className}`}><Image src={IconsFile.Minus} /></div>
            <p> {count < 10 && 0}{count}</p>
            <div onClick={IncrementProduct} className="quality_icon"><Image src={IconsFile.Plus} /></div>
        </div>
    )
}

export default QuantityComp