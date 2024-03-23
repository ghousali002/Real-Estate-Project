import { HiArrowRightOnRectangle } from "react-icons/hi2";
import ButtonIcon from "./ButtonIcon";
import { useLogout } from "../useLogout";
import SpinnerMini from "./SpinnerMini";
import { useAuth } from '../AuthContext';
import React from "react";
import toast from "react-hot-toast";

export default function LogOut() {

  const {mutate: logoutMutate , isLoading} = useLogout();
  const {logoutFrontend } = useAuth();

  const handleLogout = async () => {
      try {
        // Trigger the logout mutation
        await logoutMutate();
        logoutFrontend();
      } catch (error) {
        toast.error("Logout failed. Please try again.");
      }
    };

  return (
   <ButtonIcon disabled={isLoading}  onClick={handleLogout}>
    {!isLoading ? <HiArrowRightOnRectangle />: <SpinnerMini/>}
   </ButtonIcon>
  )
}
