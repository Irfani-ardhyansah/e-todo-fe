import useAxiosInstance from "./ApiClient";

const useCommentService = () => {
    const axiosInstance = useAxiosInstance();

    const GetComment = async (endpoint) => {
        try {
            const response = await axiosInstance.get(endpoint);
            return response.data;
        } catch (error) {
            console.error('Comment service error:', error);
            throw error;
        }
    };

    const DoPostComment = async (endpoint, data) => {
        try {
            const response = await axiosInstance.post(endpoint, data);
            return response.data;
        } catch (error) {
            console.error('doPostTask service error:', error);
            throw error;
        }
    };

    return { GetComment, DoPostComment };
};

export default useCommentService;
