import axios from 'axios'

import { IUser } from '../types/auth'
import { setAuthorizationToken } from '../utils/setAuthorizationToken'
import { SET_CURRENT_USER } from './types'

interface ICredentials {
    username: string
    password: string
}

export const getCurrentUser = () => {
    return (dispatch: any) => {
        return axios.get('/api/user')
            .then((res: any) => {
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
        return axios.post('/api/check-user', { username })
    }
}

export const login = (credentials: ICredentials) => {
    return (dispatch: any) => {
        return axios.post('/api/login', credentials)
            .then((res: any) => {
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

export const resetPasswords = (userIDs: number[]): Promise<any> => {
    return axios.post('/api/users/reset-passwords', { user_ids: userIDs })
}

export const invalidatePasswords = (userIDs: number[]): Promise<any> => {
    return axios.post('/api/users/invalidate-passwords', { user_ids: userIDs })
}

export const disableUsers = (userIDs: number[]): Promise<any> => {
    return axios.post('/api/users/disable-users', { user_ids: userIDs })
}

export const reenableUsers = (userIDs: number[]): Promise<any> => {
    return axios.post('/api/users/reenable-users', { user_ids: userIDs })
}
