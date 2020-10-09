import cx from "classnames";
import React, { useRef, useState, useEffect } from "react";

const CROP_DELAY = 150;

let timer;
let labelStyle = `background: #369; color: #fff; padding: 2px 5px; width: 100px; border-radius: 4px; display: inline-block`;
let errorStyle = `background: #c00; color: #fff; padding: 2px 5px; width: 100px; border-radius: 4px; display: inline-block`;

document.addEventListener("pointercancel", (e) => {
  console.log(
    `%c${e.type}`,
    errorStyle,
    "document pointercancel is triggered!"
  );
});

const Crop = ({ isLandscape }) => {
  const ref = useRef(null);
  const [isMoving, setIsMoving] = useState(false);
  const [posX, setPosX] = useState(null);
  const [posY, setPosY] = useState(null);
  useEffect(() => {
    const el = ref.current;
    const appEl = el.closest(".App");

    const handlePointerDown = ({ type, clientX, clientY, touches = [] }) => {
      console.log(`%c${type}`, labelStyle);
      clientX = clientX || touches[0].clientX;
      clientY = clientY || touches[0].clientY;
      if (isLandscape) setPosX(clientX);
      else setPosY(clientY);
      timer = setTimeout(() => {
        setIsMoving(true);
        appEl.style.touchAction = "none";
        appEl.style.overflowY = "hidden";
        timer = null;
      }, CROP_DELAY);
    };

    const handlePointerUp = ({ type }) => {
      if (timer) {
        clearTimeout(timer);
        console.log(`%c${type}`, labelStyle, `Failed to long press`);
      } else {
        console.log(`%c${type}`, labelStyle, "Long pressed successfully");
      }
      appEl.style.touchAction = "";
      appEl.style.overflowY = "auto";
      setIsMoving(false);
    };

    const handlePointerMove = (e) => {
      let { type, clientX, clientY, touches = [] } = e;
      clientX = clientX || touches[0].clientX;
      clientY = clientY || touches[0].clientY;

      if (!isMoving) return;
      const parentEl = el.parentNode;
      const maxMove = isLandscape
        ? parentEl.offsetWidth - el.offsetWidth - 8
        : parentEl.offsetHeight - el.offsetHeight - 8;
      const move = isLandscape ? posX - clientX : posY - clientY;
      const offset = isLandscape ? el.offsetLeft : el.offsetTop;
      const position = Math.min(Math.max(0, offset - move), maxMove);
      if (isLandscape) {
        el.style.left = `${position}px`;
        setPosX(clientX);
      } else {
        el.style.top = `${position}px`;
        setPosY(clientY);
      }
      console.log(`%c${type}`, labelStyle, "movement", position);
    };

    const handlePointerCancel = (e) => {
      console.log(`%c${e.type}`, errorStyle, e.target.className);
      if (timer) clearTimeout(timer);
      if (isLandscape) setPosX(null);
      else setPosY(null);
      appEl.style.overflowY = "auto";
      appEl.style.touchAction = "";
      setIsMoving(false);
    };

    el.addEventListener("touchstart", handlePointerDown, { passive: true });
    el.addEventListener("touchend", handlePointerUp);
    el.addEventListener("touchmove", handlePointerMove);
    el.addEventListener("touchcancel", handlePointerCancel);
    el.addEventListener("mousedown", handlePointerDown);
    el.addEventListener("mouseup", handlePointerUp);
    el.addEventListener("mousemove", handlePointerMove);
    return () => {
      el.removeEventListener("touchstart", handlePointerDown);
      el.removeEventListener("touchend", handlePointerUp);
      el.removeEventListener("touchmove", handlePointerMove);
      el.removeEventListener("touchcancel", handlePointerCancel);
      el.removeEventListener("mousedown", handlePointerDown);
      el.removeEventListener("mouseup", handlePointerUp);
      el.removeEventListener("mousemove", handlePointerMove);
    };
  }, [isMoving, posX, posY, isLandscape]);

  return (
    <span
      ref={ref}
      className={cx("Crop", {
        "Crop-portrait": !isLandscape,
        "Crop-landscape": isLandscape,
        "Crop--moving": isMoving,
      })}
      onContextMenu={(e) => e.preventDefault()}
    ></span>
  );
};

export default Crop;
