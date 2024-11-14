// services/useLogin.js
import useAxiosInstance from "./ApiClient";

const useAuthService = () => {
  const axiosInstance = useAxiosInstance();

  const DoLogin = async (data) => {
    try {
      const response = await axiosInstance.post('/user/login', data);
      return response.data;
    } catch (error) {
      console.error('Login service error:', error);
      throw error;
    }
  };

  return { DoLogin };
};

export default useAuthService;
