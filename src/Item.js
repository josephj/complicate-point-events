import cx from "classnames";
import React, { useEffect, useState, useRef } from "react";
import Crop from "./Crop";

const Item = ({ id }) => {
  const hasCrop = useRef(Math.random() > 0.4);
  const isLandscape = useRef(Math.random() >= 0.5);
  const itemRef = useRef(null);
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    const el = itemRef.current;

    let pressed = false;
    let pos = null;

    const handlePointerDown = (e) => {
      pos = [e.clientX, e.clientY];
      pressed = true;
    };

    const handlePointerUp = (e) => {
      if (!pressed) return;
      if (hasCrop) {
        const movement =
          Math.abs(e.clientX - pos[0]) + Math.abs(e.clientY - pos[1]);
        if (movement > 0) return;
      }
      setIsSelected(!isSelected);
    };

    const handlePointerCancel = () => {
      pressed = false;
      pos = null;
    };

    el.addEventListener("pointerdown", handlePointerDown);
    el.addEventListener("pointerup", handlePointerUp);
    el.addEventListener("pointerleave", handlePointerCancel);
    el.addEventListener("pointerout", handlePointerCancel);
    el.addEventListener("pointercancel", handlePointerCancel);
    return () => {
      el.removeEventListener("pointerdown", handlePointerDown);
      el.removeEventListener("pointerup", handlePointerUp);
      el.removeEventListener("pointerleave", handlePointerCancel);
      el.removeEventListener("pointerout", handlePointerCancel);
      el.removeEventListener("pointercancel", handlePointerCancel);
    };
  }, [isSelected]);

  return (
    <li
      ref={itemRef}
      className={cx("Item", { "Item--selected": isSelected })}
      onContextMenu={(e) => e.preventDefault()}
    >
      {hasCrop.current && (
        <Crop key={`Crop-${id}`} id={id} isLandscape={isLandscape.current} />
      )}
      <span className="Label">#{id + 1}</span>
    </li>
  );
};
export default Item;
