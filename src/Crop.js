import React, { forwardRef, useState } from "react";
import cx from "classnames";

window.addEventListener("pointercancel", () => {
  console.log("the browser is in charge now.");
});

let position = null;
const Crop = ({ isCropping }, ref) => {
  const [isMoving, setIsMoving] = useState(false);

  const handlePointerDown = (e) => {
    if (e.pointerType === "mouse" || !isMoving) setIsMoving(true);
    position = { x: e.clientX, y: e.clientY };
  };
  const handlePointerMove = (e) => {
    if (!isCropping || !position) return;
    const el = e.currentTarget;
    const parentEl = el.parentNode;
    const maxMoveX = parentEl.offsetWidth - el.offsetWidth - 8;
    const moveX = position.x - e.clientX;
    const left = Math.min(Math.max(0, el.offsetLeft - moveX), maxMoveX);
    el.style.top = 0;
    el.style.left = `${left}px`;
    position = { x: e.clientX, y: e.clientY };
  };
  const handlePointerCancel = () => {
    position = null;
    setIsMoving(false);
  };

  return (
    <span
      ref={ref}
      className={cx("Crop", { "Crop--moving": isMoving })}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerCancel}
      onPointerLeave={handlePointerCancel}
      onPointerCancel={handlePointerCancel}
      onContextMenu={(e) => e.preventDefault()}
    ></span>
  );
};

export default forwardRef(Crop);
