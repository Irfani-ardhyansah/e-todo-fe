import useAxiosInstance from "./ApiClient";

const useTaskService = () => {
  const axiosInstance = useAxiosInstance();

  const GetTask = async (endpoint) => {
    try {
      const response = await axiosInstance.get(endpoint);
      return response.data;
    } catch (error) {
      console.error('Task service error:', error);
      throw error;
    }
  };

  return { GetTask };
};

export default useTaskService;
