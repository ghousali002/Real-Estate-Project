import { useQuery } from 'react-query';
import axios from 'axios';
import toast from "react-hot-toast";


export function useUser() {
  const { data, isLoading, isError } = useQuery('user', fetchUser);

  return { data, isLoading, isError };
}


const fetchUser = async () => {
  try {
    // Retrieve the token from local storage
    const token = localStorage.getItem('token'); // Replace 'yourTokenKey' with the actual key used to store the token

    // Make the request with the token in the Authorization header
    const response = await axios.get('http://localhost:5000/seller/user', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });


    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      toast.error("User Not Found.");
    } else if (error.response && error.response.status === 500) {
      toast.error("Error Fetching details");
    }
    throw error;
  }
};
