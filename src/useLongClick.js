import { useState, useEffect } from "react";

const useLongClick = (ref, callback, options) => {
  const { duration = 300, isSkipMouse = false } = options || {};
  const [startTime, setStartTime] = useState(null);

  useEffect(() => {
    const el = ref.current;

    const handlePointerDown = () => {
      setStartTime(performance.now());
    };

    const handlePointerUp = (e) => {
      setStartTime(null);
      const isMouseEvent = e.pointerType === "mouse";
      if (!isSkipMouse || !isMouseEvent) {
        const endTime = performance.now();
        if (!startTime || endTime - startTime < duration) return;
      }
      callback();
    };

    const handlePointerCancel = () => {
      setStartTime(null);
    };

    el.addEventListener("pointerdown", handlePointerDown);
    el.addEventListener("pointerup", handlePointerUp);
    el.addEventListener("pointerleave", handlePointerCancel);
    el.addEventListener("pointercancel", handlePointerCancel);

    return () => {
      el.removeEventListener("pointerdown", handlePointerDown);
      el.removeEventListener("pointerup", handlePointerUp);
      el.removeEventListener("pointerleave", handlePointerCancel);
      el.removeEventListener("pointercancel", handlePointerCancel);
    };
  }, []);
};

export default useLongClick;
