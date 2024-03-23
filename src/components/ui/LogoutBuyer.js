import { HiArrowRightOnRectangle } from "react-icons/hi2";
import ButtonIcon from "./ButtonIcon";
import { useBuyerLogout } from "../useBuyerLogout";
import SpinnerMini from "./SpinnerMini";
import { useBuyerAuth } from '../BuyerContext';
import React from "react";
import toast from "react-hot-toast";

export default function LogoutBuyer() {

    const {mutate: logoutMutate , isLoading} = useBuyerLogout();
    const {logoutFrontend } = useBuyerAuth();

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
