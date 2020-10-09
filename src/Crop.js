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

    const handlePointerDown = (e) => {
      console.log(`%c${e.type}`, labelStyle);
      if (isLandscape) setPosX(e.clientX);
      else setPosY(e.clientY);
      timer = setTimeout(() => {
        appEl.style.touchAction = "none";
        setIsMoving(true);
        if (!e.type)
          console.log(`%chandlePointerDown`, errorStyle, `e.type = `, e.type);
        timer = null;
      }, CROP_DELAY);
    };

    const handlePointerUp = (e) => {
      if (timer) {
        clearTimeout(timer);
        console.log(`%c${e.type}`, labelStyle, `Failed to long press`);
      } else {
        console.log(`%c${e.type}`, labelStyle, "Long pressed successfully");
      }
      appEl.style.touchAction = "";
      setIsMoving(false);
    };

    const handlePointerMove = (e) => {
      if (!isMoving) return;
      e.preventDefault();
      const parentEl = el.parentNode;
      const maxMove = isLandscape
        ? parentEl.offsetWidth - el.offsetWidth - 8
        : parentEl.offsetHeight - el.offsetHeight - 8;
      const move = isLandscape ? posX - e.clientX : posY - e.clientY;
      const offset = isLandscape ? el.offsetLeft : el.offsetTop;
      const position = Math.min(Math.max(0, offset - move), maxMove);
      if (isLandscape) {
        el.style.left = `${position}px`;
        setPosX(e.clientX);
      } else {
        el.style.top = `${position}px`;
        setPosY(e.clientY);
      }
      console.log(`%c${e.type}`, labelStyle, "movement", position);
    };

    const handlePointerOut = (e) => {
      console.log(`%c${e.type}`, labelStyle);
    };

    const handlePointerLeave = (e) => {
      console.log(`%c${e.type}`, labelStyle);
      appEl.style.touchAction = "";
      setIsMoving(false);
    };

    const handleGotPointerCapture = (e) => {
      console.log(`%c${e.type}`, labelStyle);
    };

    const handleLostPointerCapture = (e) => {
      console.log(`%c${e.type}`, labelStyle);
    };

    const handlePointerCancel = (e) => {
      console.log(`%c${e.type}`, errorStyle, e.target.className);
      e.stopPropagation();
      if (timer) clearTimeout(timer);
      if (isLandscape) setPosX(null);
      else setPosY(null);
      appEl.style.touchAction = "";
      setIsMoving(false);
    };
    el.addEventListener("pointerdown", handlePointerDown);
    el.addEventListener("pointerup", handlePointerUp);
    el.addEventListener("pointermove", handlePointerMove);
    el.addEventListener("pointercancel", handlePointerCancel);
    el.addEventListener("pointerout", handlePointerOut);
    el.addEventListener("pointerleave", handlePointerLeave);
    el.addEventListener("gotpointercapture", handleGotPointerCapture);
    el.addEventListener("lostpointercapture", handleLostPointerCapture);
    return () => {
      el.removeEventListener("pointerdown", handlePointerDown);
      el.removeEventListener("pointerup", handlePointerUp);
      el.removeEventListener("pointermove", handlePointerMove);
      el.removeEventListener("pointercancel", handlePointerCancel);
      el.removeEventListener("pointerout", handlePointerOut);
      el.removeEventListener("pointerleave", handlePointerLeave);
      el.removeEventListener("gotpointercapture", handleGotPointerCapture);
      el.removeEventListener("lostpointercapture", handleLostPointerCapture);
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
