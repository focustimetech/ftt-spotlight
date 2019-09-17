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
