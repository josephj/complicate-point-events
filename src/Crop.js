import cx from "classnames";
import React, { useRef, useState } from "react";
import "pepjs";
// import useLongPress from "./useLongPress";

document.addEventListener("pointercancel", (e) => {
  console.log("handleDocumentPointerCancel");
});

let timer;
let labelStyle = `background: #369; color: #fff; padding: 2px 5px; width: 100px; border-radius: 4px; display: inline-block`;
const Crop = () => {
  const ref = useRef(null);
  const [isMoving, setIsMoving] = useState(false);
  const [posX, setPosX] = useState(null);

  const handlePointerDown = (e) => {
    console.log(`%c${e.type}`, labelStyle, `e.pressure = ${e.pressure}`);
    setPosX(e.clientX);
    const el = ref.current;
    timer = setTimeout(() => {
      // callback
      setIsMoving(true);
      el.style.touchAction = "none";
      el.closest("ul").style.touchAction = "none";
      el.closest(".Item ").style.touchAction = "none";
      console.log("e", e.type); // FIXME - Why?
      console.log(`%c${e.type}`, labelStyle, "touchAction", "none");
      timer = null;
    }, 500);
  };

  const handlePointerUp = (e) => {
    if (timer) {
      clearTimeout(timer);
      console.log(`%c${e.type}`, labelStyle, `Failed to long press`);
    } else {
      // success long press
      const el = ref.current;
      el.style.touchAction = "";
      el.closest(".Item ").style.touchAction = "";
      el.closest("ul").style.touchAction = "";
      console.log(`%c${e.type}`, labelStyle, "Long pressed successfully");
      // console.log(e.type, "touchAction", el.closest(".Item").style.touchAction);
    }
    setIsMoving(false);
  };

  const handlePointerMove = (e) => {
    // console.log(`%c${e.type}`, labelStyle);
    if (!isMoving) return;
    // console.log(`%c${e.type}`, labelStyle, "isMoving");
    const el = e.currentTarget;
    const parentEl = el.parentNode;
    const maxMoveX = parentEl.offsetWidth - el.offsetWidth - 8;
    const moveX = posX - e.clientX;
    const left = Math.min(Math.max(0, el.offsetLeft - moveX), maxMoveX);
    el.style.top = 0;
    el.style.left = `${left}px`;
    console.log(
      `%c${e.type}`,
      labelStyle,
      "left",
      left,
      "e.clientX",
      e.clientX
    );
    setPosX(e.clientX);
  };

  const handlePointerOut = (e) => {
    console.log(`%c${e.type}`, labelStyle);
  };

  const handlePointerLeave = (e) => {
    console.log(`%c${e.type}`, labelStyle);
  };

  const handleGotPointerCapture = (e) => {
    console.log(`%c${e.type}`, labelStyle);
  };

  const handleLostPointerCapture = (e) => {
    console.log(`%c${e.type}`, labelStyle);
  };

  const handlePointerCancel = (e) => {
    console.log(`%c${e.type}`, labelStyle);
    if (timer) clearTimeout(timer);
    setPosX(null);
    setIsMoving(false);
  };

  return (
    <span
      ref={ref}
      className={cx("Crop", { "Crop--moving": isMoving })}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerMove={handlePointerMove}
      onPointerCancel={handlePointerCancel}
      onPointerOut={handlePointerOut}
      onPointerLeave={handlePointerLeave}
      onGotPointerCapture={handleGotPointerCapture}
      onLostPointerCapture={handleLostPointerCapture}
      onContextMenu={(e) => e.preventDefault()}
    ></span>
  );
};

export default Crop;
