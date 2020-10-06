import cx from "classnames";
import React, { useState, useRef, useCallback } from "react";
import Crop from "./Crop";
import useLongClick from "./useLongClick";

const Item = ({ id }) => {
  // Selection
  const itemRef = useRef(null);
  const [isSelected, setIsSelected] = useState(false);
  const handleLongClick = useCallback((e) => setIsSelected(!isSelected), [
    isSelected,
  ]);
  useLongClick(itemRef, handleLongClick);

  // Enabling Crop
  const cropRef = useRef(null);

  return (
    <li ref={itemRef} className={cx("Item", { "Item--selected": isSelected })}>
      <Crop ref={cropRef} />
      <span className="Label">#{id + 1}</span>
    </li>
  );
};
export default Item;
