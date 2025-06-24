import axios from "axios";
import { useAuth } from "../provider/authProvider";
import { useNavigate } from "react-router-dom";

const BASE_URL = 'http://localhost:8080/api/v1'

const useAxiosInstance = () => {
  const { accessToken, setAccessToken, refreshToken, setRefreshToken } = useAuth();
  const navigate = useNavigate();

  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      'X-Api-Key': 'RAHASISA'
    },
  });

  let isRefreshing = false 
  let refreshSubscribers = []

  const onRefreshed = (newAccessToken) => {
    refreshSubscribers.forEach((callback) => callback(newAccessToken))
    refreshSubscribers = []
  }

  const addRefreshSubscriber = (callback) => {
    refreshSubscribers.push(callback)
  }

  axiosInstance.interceptors.request.use(
    (config) => {
      if(accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`
      }
      return config 
    }, 
    (error) => {
      return Promise.reject(error)
    }
  )

  axiosInstance.interceptors.response.use(
    (response) => {
      return response 
    },
    async (error) => {
      const originalRequest = error.config 

      if (error.response && error.response.status === 401 && !originalRequest._retry) {
        if(!isRefreshing) {
          originalRequest._retry = true 
          isRefreshing = true 

          try {
            const { data } = await axios.post(`${BASE_URL}/user/refresh-token`, {
              refresh_token: refreshToken
            }) 

            const newAccessToken = data.data.access_token

            setAccessToken(newAccessToken)
            onRefreshed(newAccessToken)

            originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
            return axiosInstance(originalRequest)
          } catch(err) {
            alert("Session expired. Please log in again.");
            setAccessToken(null);
            setRefreshToken(null);
            navigate('/login', { replace: true });

            return Promise.reject(err)
          } finally {
            isRefreshing = false 
          }
        } else {
          return new Promise((resolve) => {
            addRefreshSubscriber((newToken) => {
              originalRequest.headers['Authorization'] = `Bearer ${newToken}`
              resolve(axiosInstance(originalRequest))
            })
          })
        }
      }

      return Promise.reject(error)
    }
  )

  return axiosInstance
}

export default useAxiosInstance;