import { useMutation,useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

export function useLogout() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { mutate, isLoading} = useMutation({
      mutationFn: async () => {
        try {
          // Get the token from local storage or wherever you store it
          const token = localStorage.getItem('token');
  
          if (!token) {
            console.log("No token found during logout"); // Add debugging log
            // Handle case where there is no token (perhaps the user is not logged in)
            return;
          }
  
          console.log("Token before logout API call:", token); // Add debugging log
  
          // Make a call to the backend logout API with the authorization header
          await axios.post("http://localhost:5000/seller/logout", null, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
  
          // Clear queries from the query cache
          queryClient.removeQueries();
          localStorage.clear();

          document.cookie = `token=; expires=${new Date().toUTCString()}; path=/;`;
          toast.success("Logout Successful");
          navigate('/', { replace: true });
          // You can also redirect the user or perform any other actions after logout
        } catch (error) {
          // Handle error and show toast message
          toast.error("Logout failed. Please try again.");
          throw error;
        }
      },
    });
  
    return { mutate, isLoading };
  }

