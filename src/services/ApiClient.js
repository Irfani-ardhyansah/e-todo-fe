import axios from "axios";

const apiClient = axios.create({
    baseURL: 'http://localhost:8080/api/v1',
    headers: {
      'Content-Type': 'application/json',
      'X-Api-Key': 'RAHASISA'
    },
  });
  export default apiClient;