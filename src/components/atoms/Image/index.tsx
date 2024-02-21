import "./index.scss";
import { useEffect, useState } from "react";
import { ImageProps } from "./interface";

/**
 *
 * @param {string} className style for div
 * @param {string} src image souce
 * @param {string} alt alternative name
 * @returns Image atom
 */

const ImageComp: React.FC<ImageProps> = (props) => {
  const {
    className = "",
    src,
    alt = "img",
    onClick,
  } = props;
  const [isLoadImg, setIsLoadImg] = useState(true);
  // load img
  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setIsLoadImg(false);
    };
  }, [src]);

  return (
    <div className={` ${isLoadImg ? "blank" : ""}`}>
      <picture onClick={onClick}>
        <img src={src} alt={alt} className={className} />
      </picture>
    </div>
  );
}
export default ImageComp;