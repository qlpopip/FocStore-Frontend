import "./index.scss";
import { OverlayProps } from "./interface";

/**
 * @param {void} onClick click action
 * @returns overlay component that is used in confirm or modal.
 */
export default function OverlayComp({ onClick }: OverlayProps) {
  return <div id="overlay" onClick={onClick} />;
}
