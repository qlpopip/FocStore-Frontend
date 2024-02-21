import "./index.scss";
import { TextAreaProps } from "./interface";

/**
 *
 * @param {string} className style name of a div
 * @param {string} id tag identifier
 * @param {string} name tag name or title
 * @param {string} value input value of a user
 * @param {string} placeholder short hint that describes the expected value
 * @param {Event} onChange trigger event when user inputs
 * @returns TextArea atom
 */
export default function TextAreaComp({
  className,
  id = "",
  name = "",
  value = "",
  placeholder = "",
  onChange,
}: TextAreaProps) {
  return (
    <textarea
      className={`textarea round-2 ${className}`}
      id={id}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
}
