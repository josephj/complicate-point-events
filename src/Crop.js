import cx from "classnames";
import React, { forwardRef, useState } from "react";
// import useLongPress from "./useLongPress";

document.addEventListener("pointercancel", (e) => {
  console.log("handleDocumentPointerCancel");
});

let timer;
const Crop = (_, ref) => {
  const [isMoving, setIsMoving] = useState(false);
  const [posX, setPosX] = useState(null);

  const handlePointerDown = (e) => {
    console.log("handlePointerDown");
    console.log("handlePointerDown > e.pressure", e.pressure);
    setPosX(e.clientX);
    const el = ref.current;
    timer = setTimeout(() => {
      // callback
      setIsMoving(true);
      el.style.touchAction = "none";
      el.closest(".Item ").style.touchAction = "none";
      console.log(
        "handlePointerUp > touchAction",
        el.closest(".Item").style.touchAction
      );
      timer = null;
    }, 500);
  };

  const handlePointerUp = (e) => {
    if (timer) {
      clearTimeout(timer);
      console.log("handlePointerUp > Failed to long press");
    } else {
      // success long press
      const el = ref.current;
      el.style.touchAction = "";
      el.closest(".Item ").style.touchAction = "";
      console.log(
        "handlePointerUp > touchAction",
        el.closest(".Item").style.touchAction
      );
      console.log("handlePointerUp > Long pressed");
    }
    setIsMoving(false);
  };

  const handlePointerMove = (e) => {
    if (!isMoving) return;
    console.log("handlePointerMove");
    const el = e.currentTarget;
    const parentEl = el.parentNode;
    const maxMoveX = parentEl.offsetWidth - el.offsetWidth - 8;
    const moveX = posX - e.clientX;
    const left = Math.min(Math.max(0, el.offsetLeft - moveX), maxMoveX);
    el.style.top = 0;
    el.style.left = `${left}px`;
    setPosX(e.clientX);
  };

  const handlePointerOut = () => {
    console.log("handlePointerOut");
  };

  const handlePointerLeave = () => {
    console.log("handlePointerLeave");
  };

  const handleGotPointerCapture = () => {
    console.log("handleGotPointerCapture");
  };

  const handleLostPointerCapture = () => {
    console.log("handleLostPointerCapture");
  };

  const handlePointerCancel = (e) => {
    console.log("handlePointerCancel");
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
      onContextMenu={(e) => e.preventDefault()}
      onPointerOut={handlePointerOut}
      onPointerLeave={handlePointerLeave}
      onGotPointerCapture={handleGotPointerCapture}
      onLostPointerCapture={handleLostPointerCapture}
    ></span>
  );
};

export default forwardRef(Crop);
