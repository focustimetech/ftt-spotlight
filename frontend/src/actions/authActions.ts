import { AxiosResponse } from 'axios'
import cookies from 'js-cookie'

import { ReduxAction } from '../types'
import { IAvatar, ICredentials, IUser, IAuthorization } from '../types/auth'
import API, { axios } from '../utils/api'
import redirect from '../utils/redirect'
import { SET_CURRENT_USER, UNSET_CURRENT_USER } from './types'
import { setAuthorizationToken } from 'src/utils/auth'

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
    return API.post('/login', credentials).then((res: AxiosResponse<IAuthorization>) => {
        setAuthorizationToken(res.data.accessToken)
        return API.get('/user').then((userRes: AxiosResponse<IUser>) => {
            return dispatch({
                type: SET_CURRENT_USER,
                payload: userRes.data
            })
        })
    })
}


export const logout = () => dispatch => {
    return API.post('/logout').then(() => {
        setAuthorizationToken()
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
