import staticAxios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

/**
 * Define Axios constants
 */
export const axios: AxiosInstance = staticAxios.create({ withCredentials: true })

axios.defaults.headers['Accept'] = 'application/json'
axios.defaults.headers['Content-Type'] = 'application/json'

/**
 * @TODO Move this to .env
 */
const API_BASE_URL: string = 'http://localhost:8000'
const API_ENDPOINT: string = '/api'

class API {
    static get = <T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> => {
        return axios.get(`${API_BASE_URL}${API_ENDPOINT}${url}`)
    }

    static post = <T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R> => {
        return axios.post(`${API_BASE_URL}${API_ENDPOINT}${url}`, data, config)
    }

    static put = <T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R> => {
        return axios.put(`${API_BASE_URL}${API_ENDPOINT}${url}`, data, config)
    }

    static delete = <T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> => {
        return axios.delete(`${API_BASE_URL}${API_ENDPOINT}${url}`, config)
    }

    static getBaseUrl = (): string => {
        return API_BASE_URL
    }
}

export default API
