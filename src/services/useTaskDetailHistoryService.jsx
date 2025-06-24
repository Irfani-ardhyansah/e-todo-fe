import useAxiosInstance from "./ApiClient";

const useTaskDetailHistoryService = () => {
  const axiosInstance = useAxiosInstance();

  const GetTaskDetailHistory = async (endpoint) => {
    try {
      const response = await axiosInstance.get(endpoint);
      return response.data;
    } catch (error) {
      console.error('Task Detail History service error:', error);
      throw error;
    }
  };

  const GetTaskDetailHistoryByTaskId = async (endpoint, id) => {
    try {
      const response = await axiosInstance.get(`${endpoint}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Task Detail History service error:', error);
      throw error;
    }
  };

  return { GetTaskDetailHistory, GetTaskDetailHistoryByTaskId };
};

export default useTaskDetailHistoryService;
