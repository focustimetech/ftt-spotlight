import { AxiosResponse } from 'axios'
import cookies from 'js-cookie'

import { ReduxAction } from '../types'
import { IAvatar, ICredentials, IUser } from '../types/auth'
import API, { axios } from '../utils/api'
import redirect from '../utils/redirect'
import { SET_CURRENT_USER, UNSET_CURRENT_USER } from './types'

export const dispatchCurrentUser = () => dispatch => {
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

export const login = (credentials: ICredentials) => dispatch => {
    return getCsrfCookie().then(() => {
        return API.post('/login', credentials).then((res: AxiosResponse<IUser>) => {
            return dispatch({
                type: SET_CURRENT_USER,
                payload: res.data
            })
        })
    })
}

export const getCsrfCookie = () => {
    return axios.get(`${API.getBaseUrl()}/sanctum/csrf-cookie`)
}

export const logout = () => dispatch => {
    return API.post('/logout').then(() => {
        redirect('/login')
        return dispatch({
            type: UNSET_CURRENT_USER
        })
    })
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
