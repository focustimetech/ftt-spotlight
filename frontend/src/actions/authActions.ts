import { AxiosResponse } from 'axios'

import { ReduxAction } from '../types'
import { IAvatar, ICredentials, IUser } from '../types/auth'
import API, { axios } from '../utils/api'
import { SET_CURRENT_USER } from './types'

export const dispatchCurrentUser = () => dispatch => {
    console.log('dispatchCurrentUser()')
    return API.get('/user').then((res: AxiosResponse<IUser>) => {
        return dispatch({
            type: SET_CURRENT_USER,
            payload: res.data
        })
    })
}

export const getAvatar = (username: string) => {
    return API.get<IAvatar>(`/avatar/${username}`)
}

export const login = (credentials: ICredentials) => {
    return getCsrfCookie().then(() => {
        return axios.post(`${API.getBaseUrl()}/login`, credentials)
    })
}

export const getCsrfCookie = () => {
    return axios.get(`${API.getBaseUrl()}/sanctum/csrf-cookie`)
}

export const logout = () => {
    return (dispatch: any) => {
        return API.post('/api/logout')
    }
}

export const resetPasswords = (userIDs: number[]): Promise<any> => {
    return API.post('/api/users/reset-passwords', { user_ids: userIDs })
}

export const invalidatePasswords = (userIDs: number[]): Promise<any> => {
    return API.post('/api/users/invalidate-passwords', { user_ids: userIDs })
}

export const disableUsers = (userIDs: number[]): Promise<any> => {
    return API.post('/api/users/disable-users', { user_ids: userIDs })
}

export const reenableUsers = (userIDs: number[]): Promise<any> => {
    return API.post('/api/users/reenable-users', { user_ids: userIDs })
}
