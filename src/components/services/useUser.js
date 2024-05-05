import { useQuery } from 'react-query';
import axios from 'axios';
import toast from "react-hot-toast";

export function useUser() {
  const queryInfo = useQuery('user', fetchUser);

  return {
    ...queryInfo, // Spread all properties from the queryInfo object
    refetchUser: queryInfo.refetch, // Specifically expose the refetch function
  };
}

const fetchUser = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get('http://localhost:5000/seller/user', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    localStorage.setItem('userId', response.data.user._id);
    return response.data;
  } catch (error) {
    const message = error.response?.status === 404
      ? "User Not Found."
      : "Error Fetching details";
    toast.error(message);
    throw error; // Rethrowing the error is important for react-query to handle the state correctly
  }
};
