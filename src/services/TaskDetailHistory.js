import useAxiosInstance from "./ApiClient";

const useTaskDetailHistoryService = () => {
  const axiosInstance = useAxiosInstance();

  const GetTaskDetailHistory = async () => {
    try {
      const response = await axiosInstance.get('/timer/weekly-report');
      return response.data;
    } catch (error) {
      console.error('Task Detail History service error:', error);
      throw error;
    }
  };

  return { GetTaskDetailHistory };
};

export default useTaskDetailHistoryService;
