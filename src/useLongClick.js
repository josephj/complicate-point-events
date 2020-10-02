import { useState, useEffect, useCallback } from "react";

const useLongClick = (ref, callback, options) => {
  const { duration = 300, isSkipMouse = false } = options || {};
  const [startTime, setStartTime] = useState(null);

  const handlePointerDown = useCallback(() => {
    setStartTime(performance.now());
  }, []);

  const handlePointerUp = useCallback(
    (e) => {
      setStartTime(null);
      const isMouseEvent = e.pointerType === "mouse";
      if (!isSkipMouse || !isMouseEvent) {
        const endTime = performance.now();
        if (!startTime || endTime - startTime < duration) return;
      }
      callback();
    },
    [startTime, callback, duration, isSkipMouse]
  );

  const handlePointerCancel = useCallback(() => {
    setStartTime(null);
  }, []);

  useEffect(() => {
    const el = ref.current;

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
  }, [ref, handlePointerDown, handlePointerUp, handlePointerCancel]);
};

export default useLongClick;
