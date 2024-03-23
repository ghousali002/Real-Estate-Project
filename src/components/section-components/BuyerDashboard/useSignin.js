import { useMutation } from "react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useBuyerAuth } from '../../BuyerContext';
import {buyerlogin} from "../../services/apiAuth";

export function useSignin() {
    const { loginFrontend } = useBuyerAuth();
    const navigate = useNavigate();
    const { mutate } = useMutation({
      mutationFn: buyerlogin,
      onSuccess: () => {
        loginFrontend();
        toast.success("Login Successfully");
        navigate('/dashboardlinks//Dashboard', {replace: true});
    
      },
      onError: (err) => toast.error(err.message),
    });
  
    return { mutate };
}