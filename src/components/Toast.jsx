import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideToast } from "../utils/toastSlice";

const Toast = () => {
  const dispatch = useDispatch();
  const { message, visible, type } = useSelector(
    (store) => store.toast
  );

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        dispatch(hideToast());
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [visible, dispatch]);

  if (!visible) return null;

  return (
    <div className="fixed top-6 left-1/2 z-[100]
                    -translate-x-1/2">
      <div
        className={`
          px-4 py-2 rounded-lg text-sm font-medium shadow-lg
          backdrop-blur
          ${
            type === "success"
              ? "bg-emerald-500/90 text-black"
              : "bg-gray-800 text-white"
          }
        `}
      >
        {message}
      </div>
    </div>
  );
};

export default Toast;
