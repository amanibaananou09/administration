import { toast, ToastPosition } from "react-toastify";

export const useToaster = () => {
  const success = (message: string, position?: ToastPosition) => {
    toast.success(message, {
      position: position ?? "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      theme: "colored",
    });
  };

  const error = (message: string, position?: ToastPosition) => {
    toast.error(message, {
      position: position ?? "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      theme: "colored",
    });
  };

  return {
    success,
    error,
  };
};
