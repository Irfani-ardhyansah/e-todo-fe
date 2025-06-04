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

  const GetTaskDetail = async (endpoint, id) => {
    try {
      const response = await axiosInstance.get(`${endpoint}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Task Detail service error:', error);
      throw error;
    }
  };

  const DoPostTask = async (endpoint, data) => {
    try {
      const response = await axiosInstance.post(endpoint, data);
      return response.data;
    } catch (error) {
      console.error('doPostTask service error:', error);
      throw error;
    }
  };

  return { GetTask, DoPostTask, GetTaskDetail };
};

export default useTaskService;
