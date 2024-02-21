import "./index.scss"
import { Link } from "react-router-dom"
import { NavigatorProps } from "./interface"

const NavigatorComp: React.FC<NavigatorProps> = (props) => {
    const { title, path, navigation } = props
    return (
        <div className="navigate">
            <div className="container">
                <div className="navigate__box">
                    <Link to="/">Shop</Link>&nbsp;/&nbsp;
                    {title && path && <><Link to={path}>{title}</Link>&nbsp;/&nbsp;</>}
                    {navigation && (
                        <p>{navigation.slice(0, 1).toUpperCase() + navigation.slice(1)}</p>

                    )}
                </div>
            </div>
        </div>
    )
}

export default NavigatorComp