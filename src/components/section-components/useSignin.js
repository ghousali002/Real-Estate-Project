import { useMutation } from "react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../AuthContext';
import {login} from "../services/apiAuth";

export function useSignin() {
 const { loginFrontend } = useAuth();
    const navigate = useNavigate();
    const { mutate } = useMutation({
      mutationFn: login,
      onSuccess: () => {
        toast.success("Login Successfully");
       loginFrontend();
        navigate('/dashboard', {replace: true});
      },
      onError: (err) => toast.error(err.message),
    });
  
    return { mutate };
}