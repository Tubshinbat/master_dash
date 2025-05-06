import { useEffect } from "react";
import { toastControl } from "src/lib/toasControl";

export const useToastNotification = (error, success, onSuccessNavigate) => {
  useEffect(() => {
    if (error) {
      toastControl("error", error);
      return;
    }
  }, [error]);

  useEffect(() => {
    if (success) {
      toastControl("success", success);
      if (onSuccessNavigate) {
        setTimeout(() => onSuccessNavigate(), 2000);
      }
    }
  }, [success, onSuccessNavigate]);
};
