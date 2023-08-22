import { toast } from "react-toastify";
export const toastControl = (type, msg) => {
  toast[type](msg, {
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};
