import { ModalProps } from "./interface";

/**
 *
 * @param { string } ClassName style for div
 * @param { boolean } isOpen for open modall
 * @param {React.ReactNode} children modal content
 * @param {Event} onClick Click function for confirming.
 * @returns Modal Component with a click action
 */
export default function ModalComp({
  className = "",
  children,
  onClick,
  isOpen,
}: ModalProps) {
  if (typeof window !== "undefined") {
    if (isOpen) {
      // Prevent scrolling on the body element
      document.body.style.overflow = "hidden";
    } else {
      // Re-enable scrolling on the body element
      document.body.style.overflow = "auto";
    }
  }
  return (
    <div id="modal">
      <div className={`modal_box ${isOpen ? "open" : ""}  `}>
        <div className="modal">
          <div className={`modal-content ${className}`}>{children}</div>
        </div>
        <div className="modal_bg" onClick={onClick}></div>
      </div>
    </div>
  );
}
