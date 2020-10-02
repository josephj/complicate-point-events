import { useState, useEffect } from "react";

export const useLongPress = (
  ref,
  onLongPressDown = () => {},
  onLongPressUp = () => {},
  onLongPressCancel = () => {},
  options = {}
) => {
  const [timer, setTimer] = useState(null);
  const { duration = 300 } = options;

  useEffect(() => {
    const el = ref.current;

    const handlePointerDown = (e) => {
      const time = setTimeout(() => {
        onLongPressDown(e);
        setTimer(null);
      }, duration);
      setTimer(time);
    };

    const handlePointerUp = (e) => {
      if (timer) {
        clearTimeout(timer);
        onLongPressCancel(e);
      } else {
        onLongPressUp(e);
      }
    };

    const handlePointerCancel = (e) => {
      if (timer) clearTimeout(timer);
      onLongPressCancel(e);
    };

    el.addEventListener("pointerdown", handlePointerDown);
    el.addEventListener("pointerup", handlePointerUp);
    el.addEventListener("pointerleave", handlePointerCancel);
    el.addEventListener("pointercancel", handlePointerCancel);
    return () => {
      console.log("unmount");
      el.removeEventListener("pointerdown", handlePointerDown);
      el.removeEventListener("pointerup", handlePointerCancel);
      el.removeEventListener("pointerleave", handlePointerCancel);
      el.removeEventListener("pointercancel", handlePointerCancel);
    };
  }, [ref, duration, timer, onLongPressDown, onLongPressUp, onLongPressCancel]);
};

export default useLongPress;
