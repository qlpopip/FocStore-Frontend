import "./index.scss";
import { ButtonProps } from "./interface";

/**
 *
 * @param {string} type 3 types: button, submit, reset
 * @param {string} theme 4 themes: '' | 'primary' | 'secondary' | 'more'
 * @param {string} className style name for div
 * @param {string} children text inside button
 * @param {string} onClick click event
 * @param {boolean} isInactive disabled true/false
 * @returns Button according to the type, theme and etc.
 */

const ButtonComp: React.FC<ButtonProps> = (props) => {
  const {
    type = "button",
    theme = "",
    className = "",
    children,
    onClick,
    isInactive,
  } = props;
  return (
    <button
      type={type}
      onClick={onClick}
      className={`button round-16 ${className} ${
        isInactive ? "inactive" : ""
      } ${theme}`}
      disabled={isInactive}
    >
      <span>{children}</span>
    </button>
  );
};
export default ButtonComp;
