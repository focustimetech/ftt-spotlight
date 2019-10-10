import axios from 'axios'

import { SET_CURRENT_USER } from './types'
import { IUser } from '../types/auth'
import { setAuthorizationToken } from '../utils/setAuthorizationToken'

interface ICredentials {
    username: string
    password: string
}

export const getCurrentUser = () => {
    return (dispatch: any) => {
        return axios.get('/api/user')
            .then(res => {
                const user: IUser = res.data
                dispatch({
                    type: SET_CURRENT_USER,
                    payload: user
                })
            }) 
    }
}

export const checkUsername = (username: string) => {
    /*
    const config = {
        headers: [
            { 'Content-Type': 'application/jon' },
            { 'Accept': 'application/jon' },
        ]
    }
    */
    return (dispatch: any) => {
        return axios.post(`/api/check-user`, { username })
    }
}

export const login = (credentials: ICredentials) => {
    return (dispatch: any) => {
        return axios.post('/api/login', credentials)
            .then(res => {
                const token = res.data.access_token
                setAuthorizationToken(token)
                getCurrentUser()
            })
    }
}

export const logout = () => {
    return (dispatch: any) => {
        return axios.post('/api/logout')
    }
}

export const resetPasswords = (userIds: number[]): Promise<any> => {
    return axios.post('/api/users/reset-passwords', userIds)
}

export const invalidatePasswords = (userIds: number[]): Promise<any> => {
    return axios.post('/api/users/invalidate-passwords', userIds)
}

export const disableUsers = (userIds: number[]): Promise<any> => {
    return axios.post('/api/users/disable-users', userIds)
}

export const reenableUsers = (userIds: number[]): Promise<any> => {
    return axios.post('/api/users/reenable-users', userIds)
}
