import "./index.scss";
import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

const EyeComponent: React.FC = () => {
  const navigate = useNavigate()
  const leftEyeRef = useRef<HTMLDivElement>(null);
  const rightEyeRef = useRef<HTMLDivElement>(null);

  const moveEye = (eye: HTMLDivElement | null, event: MouseEvent) => {
    if (eye) {
      const x = eye.offsetLeft + eye.clientWidth / 2;
      const y = eye.offsetTop + eye.clientHeight / 2;
      const rad = Math.atan2(event.pageX - x, event.pageY - y);
      const rot = rad * (180 / Math.PI) * -1 + 180;
      eye.style.transform = `rotate(${rot}deg)`;
    }
  };

  const handleMouseMove = (event: MouseEvent) => {
    moveEye(leftEyeRef.current, event);
    moveEye(rightEyeRef.current, event);
  };

  useEffect(() => {
    document.body.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.body.removeEventListener("mousemove", handleMouseMove);
    };
    // eslint-disable-next-line
  }, []);
  const onClickGoBack = () => {
    navigate("/")
    window.location.reload()
  };
  return (
    <div className="body">
      <div className="container">
        <div className="num_box">
          <span className="error_num">5</span>
          <div className="eye" ref={leftEyeRef}></div>
          <div className="eye" ref={rightEyeRef}></div>
        </div>
        <p className="sub_text">
          Oh eyeballs! Something went wrong. We're looking to see what happened.
        </p>
        <Link to="/" className="refresh_link" onClick={onClickGoBack}>
          <span className="refresh_link_text">Go back</span>
        </Link>
      </div>
    </div>
  );
};
export default EyeComponent;
