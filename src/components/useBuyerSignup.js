import { useMutation } from "react-query";
import toast from "react-hot-toast";
import {buyersignup} from "./services/apiAuth";

export function useBuyerSignup() {
    const { mutate } = useMutation({
      mutationFn: buyersignup,
      onSuccess: () => {
        toast.success("Verify Your Email Please");
      },
      onError: (err) => toast.error(err.message),
    });
  
    return { mutate };
}