import { useEffect } from "react";

export const useLongPress = (
  ref,
  onLongPressDown = () => {},
  onLongPressCancel = () => {},
  onLongPressUp = () => {},
  options = {}
) => {
  const { duration = 300 } = options;

  useEffect(() => {
    const el = ref.current;

    const bind = () => {
      el.addEventListener("pointerup", handlePointerUp, false);
      // el.addEventListener("pointerleave", handlePointerCancel);
      // el.addEventListener("pointercancel", handlePointerCancel);
    };

    const unbind = () => {
      el.removeEventListener("pointerup", handlePointerUp, false);
      // el.removeEventListener("pointerleave", handlePointerCancel);
      // el.removeEventListener("pointercancel", handlePointerCancel);
    };

    let timer = null;

    const handlePointerDown = (e) => {
      bind();
      timer = setTimeout(() => {
        onLongPressDown(e);
        timer = null;
      }, duration);
    };

    const handlePointerUp = (e) => {
      console.log('timer', timer)
      if (timer) {
        clearTimeout(timer)
        console.log('cancel');
        onLongPressCancel(e); 
      } else {
        console.log('up');
        onLongPressUp(e);
      }
      unbind();
    };

    const handlePointerCancel = (e) => {
      console.log('useLongPress', 'handlePointerCancel', e.type)
      if (timer) clearTimeout(timer);
      onLongPressCancel(e);
      unbind();
    };

    el.addEventListener("pointerdown", handlePointerDown);
    return () => {
      console.log('unsubscribe');
      el.removeEventListener("pointerdown", handlePointerDown);
      unbind();
    };
  }, []); // eslint-disable-line
  //}, [ref, duration, onLongPressDown, onLoadPressCancel, onLongPressUp]);
};

export default useLongPress;
