import useAxiosInstance from "./ApiClient";

const useTimerService = () => {
  const axiosInstance = useAxiosInstance();

  const DoPostTimer = async (endpoint, timerIdOrTaskId, data) => {
    try {
      const response = await axiosInstance.post(`${endpoint}/${timerIdOrTaskId}`, data);
      return response.data;
    } catch (error) {
      console.error('doPostTimer service error:', error);
      throw error;
    }
  };

  const DoUpdateTimer = async (endpoint, timerIdOrTaskId, data) => {
    try {
      const response = await axiosInstance.put(`${endpoint}/${timerIdOrTaskId}`, data);
      return response.data;
    } catch (error) {
      console.error('doUpdateTimer service error:', error);
      throw error;
    }
  };

  return { DoPostTimer, DoUpdateTimer };
};

export default useTimerService;
