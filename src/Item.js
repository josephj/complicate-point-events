import cx from "classnames";
import React, { useState, useRef } from "react";
import Crop from "./Crop";
import useLongClick from "./useLongClick";
import useLongPress from "./useLongPress";

let x;
const Item = ({ id }) => {
  // Selection
  const itemRef = useRef(null);
  const [isSelected, setIsSelected] = useState(false);
  const handleLongClick = () => setIsSelected(!isSelected);
  useLongClick(itemRef, handleLongClick, { isSkipMouse: true });

  // Enabling Crop
  const cropRef = useRef(null);
  const [isCropping, setIsCropping] = useState(false);
  const handleLongPressDown = (e) => {
    x = e.clientX;
    setIsCropping(true);
  };
  const handleLongPressUp = (e) => {
    // avoid selection while no movement
    if (x !== e.clientX) e.stopPropagation();
    setIsCropping(false);
  };
  useLongPress(cropRef, handleLongPressDown, handleLongPressUp);

  return (
    <li
      ref={itemRef}
      className={cx("Item", {
        "Item--selected": isSelected,
        "Item--cropping": isCropping,
      })}
    >
      <Crop ref={cropRef} isCropping={isCropping} />
      <span className="Label">#{id + 1}</span>
    </li>
  );
};
export default Item;
