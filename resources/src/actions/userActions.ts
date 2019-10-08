import axios from 'axios'

import { FETCH_USERS, INVALIDATE_PASSWORD, DISABLE_USER, RESET_PASSWORD } from './types'
import { IUser } from '../types/auth'

export const fetchUsers = () => {
    return (dispatch: any) => {
        return axios.get('/api/users')
            .then((res: any) => {
                dispatch({
                    type: FETCH_USERS,
                    payload: res.data
                })
            })
    }
}

export const disableUser = (userId: number) => {
    return (dispatch: any) => {
        return axios.post(`/api/users/disable/${userId}`)
            .then((res: any) => {
                dispatch({
                    type: DISABLE_USER,
                    payload: res.data
                })
            })
    }
}

export const invalidatePassword = (userId: number) => {
    return (dispatch: any) => {
        return axios.get(`/api/users/invalidate-password/${userId}`)
            .then((res: any) => {
                dispatch({
                    type: INVALIDATE_PASSWORD,
                    payload: res.data
                })
            })
    }
}

export const resetPassword = (userId: number) => {
    return (dispatch: any) => {
        return axios.get(`/api/users/reset-password/${userId}`)
            .then((res: any) => {
                dispatch({
                    type: RESET_PASSWORD,
                    payload: res.data
                })
            })
    }
}
