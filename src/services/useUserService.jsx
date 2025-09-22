import useAxiosInstance from "./ApiClient";

const useUserService = () => {
    const axiosInstance = useAxiosInstance();

    const GetUser = async (endpoint) => {
        try {
            const response = await axiosInstance.get(endpoint);
            return response.data;
        } catch (error) {
            console.error('Task service error:', error);
            throw error;
        }
    };

    const DoPostUser = async (endpoint, data) => {
        try {
            const response = await axiosInstance.post(endpoint, data);
            return response.data;
        } catch (error) {
            console.error('doPostTask service error:', error);
            throw error;
        }
    };


    const DoUpdateUser = async (endpoint, id, data) => {
        try {
            const response = await axiosInstance.put(`${endpoint}/${id}`, data);
            return response.data;
        } catch (error) {
            console.error('DoUpdateUser error:', error);
            throw error;
        }
    };

    const DoDeleteUser = async (endpoint, id) => {
        try {
            const response = await axiosInstance.delete(`${endpoint}/${id}`);
            return response.data;
        } catch (error) {
            console.error('DoDeleteUser error :', error);
            throw error;
        }
    }

    return { GetUser, DoPostUser, DoUpdateUser, DoDeleteUser };
};

export default useUserService;
