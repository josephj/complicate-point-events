import { useEffect } from "react";

const useLongClick = (ref, callback, options) => {
  const { duration = 150, isSkipMouse = true } = options || {};

  useEffect(() => {
    const el = ref.current;

    let startTime = null;

    const bind = () => {
      el.addEventListener("pointerup", handlePointerUp);
      el.addEventListener("pointerleave", handlePointerCancel);
      el.addEventListener("pointerout", handlePointerCancel);
      el.addEventListener("pointercancel", handlePointerCancel);
    };

    const unbind = () => {
      el.removeEventListener("pointerup", handlePointerUp);
      el.removeEventListener("pointerleave", handlePointerCancel);
      el.removeEventListener("pointerout", handlePointerCancel);
      el.removeEventListener("pointercancel", handlePointerCancel);
    };

    const handlePointerDown = () => {
      startTime = performance.now();
      bind();
    };

    const handlePointerCancel = () => {
      startTime = null;
      unbind();
    };

    const handlePointerUp = (e) => {
      if (startTime) callback(e);
    };

    el.addEventListener("pointerdown", handlePointerDown);
    return () => el.removeEventListener("pointerdown", handlePointerDown);
  }, [ref, callback, duration, isSkipMouse]);
};

export default useLongClick;
