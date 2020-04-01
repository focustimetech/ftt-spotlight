import axios, { AxiosResponse } from 'axios'

import { IAvatar, ReduxAction } from '../types'
import { ICredentials, IUser } from '../types/auth'
import API from '../utils/api'
import { SET_CURRENT_USER } from './types'

export const dispatchCurrentUser = () => {
    return (dispatch: (action: ReduxAction<IUser>) => void) => {
        return API.get('/user')
            .then((res: AxiosResponse<IUser>) => {
                dispatch({
                    type: SET_CURRENT_USER,
                    payload: res.data
                })
            })
    }
}

export const getAvatar = (username: string) => {
    return API.get<IAvatar>(`/avatar/${username}`)
}

export const login = (credentials: ICredentials) => {
    return API.get('/sanctum/csrf-cookie').then(() => API.post('/login', credentials))
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
