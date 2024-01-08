import { useMutation } from "react-query";
import toast from "react-hot-toast";
import {signup} from "./services/apiAuth";

export function useSignup() {
    const { mutate } = useMutation({
      mutationFn: signup,
      onSuccess: () => {
        toast.success("Verify Your Email Please");
      },
      onError: (err) => toast.error(err.message),
    });
  
    return { mutate };
}