import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

const API_BASE_URL: string = 'http://localhost:8000/api'

class API {
    static get = <T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> => {
        return axios.get(`${API_BASE_URL}${url}`, config)
    }

    static post = <T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R> => {
        return axios.post(`${API_BASE_URL}${url}`, data, config)
    }

    static put = <T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R> => {
        return axios.put(`${API_BASE_URL}${url}`, data, config)
    }

    static delete = <T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> => {
        return axios.delete(`${API_BASE_URL}${url}`, config)
    }
}

export default API
