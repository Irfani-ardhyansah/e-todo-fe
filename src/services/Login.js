import apiClient from "./ApiClient"

export const doLogin = (data) => {
    return apiClient.post('/login', data);
}