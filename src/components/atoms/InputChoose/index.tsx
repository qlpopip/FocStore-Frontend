import { InputChooseProps } from "./interface";
import "./index.scss"
/**
 * Checkbox or radio input component.
 *
 * @component
 * @param {InputChooseProps} props - The component props.
 * @param {boolean} props.checked - Determines whether the input is checked or not.
 * @param {(e: React.ChangeEvent<HTMLInputElement>) => void} props.onChange - Event handler.
 * @param {string} props.name - The name of the input.
 * @param {string} props.value - The value of the input.
 * @param {string} [props.label] - The label text associated with the input (optional).
 * @param {string} props.id - The ID attribute of the input.
 * @param {string} [props.className] - The class name for the input component (optional).
 * @param {string} props.type - The type of the input.
 * @param {() => void} [props.onClick] - Event handler for the input's click event (optional).
 * @returns {JSX.Element} The rendered input component.
 */
const InputChoose: React.FC<InputChooseProps> = (props) => {
    const { checked,
        onChange,
        name,
        value,
        label,
        id,
        className,
        type,
        onClick } = props
    const inputValue = typeof value === 'boolean' ? value.toString() : value;
    return (
        <div id="inputRange" >
            <div className={` box ${className}`}>
                <input type={type} name={name} value={inputValue} id={id}
                    checked={checked} onChange={onChange} className="chekbox" onClick={onClick} />
                <label htmlFor={id} >{label}</label>
            </div>
        </div>

    );
}
export default InputChoose