import "./index.scss";
import { IconProps } from "./interface";
import { Image } from "..";

/**
 *
 * @param {string} className style name for a div
 * @param {string} name filename, icon name
 * @param {Event} onClick onclick event
 * @returns Icon atom
 */
const IconComp: React.FC<IconProps> = (props) => {
  const { className = "", name = "", onClick } = props;
  return (
    <Image
      className={`icon ${className}`}
      src={`src/assets/icons/icon-${name}.svg`}
      onClick={onClick}
      alt="icon"
    />
  );
};
export default IconComp;
