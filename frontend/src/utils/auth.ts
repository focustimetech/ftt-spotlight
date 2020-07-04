import { axios } from './api'
import { ACCESS_TOKEN } from './localStorage/keys'

export const setAuthorizationToken = (token: string) => {
    if (token) {
        localStorage.setItem(ACCESS_TOKEN, token)
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    } else {
        localStorage.removeItem(ACCESS_TOKEN)
        delete axios.defaults.headers.common['Authorization']
    }
}
