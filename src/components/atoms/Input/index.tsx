import "./index.scss";
import { InputProps } from "./interface";
/**
 *
 * @param {string} className style name of a div
 * @param {string} type input type. default: text
 * @param {string} name name of input
 * @param {string} value input value from a user
 * @param {Event} onChange on change event
 * @param {string} placeholder short hint that describes the expected value
 * @param {number} maxLength maximum length of a value param
 * @param {string} inputMode help device or browser decide which keyboard to display
 * @param {string | undefined} pattern specifies a regular expression.
 * @param {any | undefined} id ID attribute of the input field.
 * The pattern attribute works with the following input types: text, date, search, url, tel, email, and password.
 * @returns Input atom with different types. default: text
 */
export default function InputComp({
  className = "",
  type = "text",
  name,
  value = "",
  onChange,
  placeholder = "",
  maxLength = 5000,
  inputMode = "text",
  pattern,
  id,
  readOnly,
}: InputProps) {
  return (
    <input
      className={`input round-2 ${className}`}
      type={type}
      pattern={pattern}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder ?? ""}
      inputMode={inputMode}
      maxLength={maxLength}
      id={id}
      readOnly={readOnly}
    />
  );
}
