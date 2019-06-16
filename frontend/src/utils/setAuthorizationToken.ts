import axios from 'axios'

export const setAuthorizationToken = (token: string) => {
    if (token) {
        localStorage.setItem('access_token', token)
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    } else {
        localStorage.removeItem('access_token')
        delete axios.defaults.headers.common['Authorization']
    }
}