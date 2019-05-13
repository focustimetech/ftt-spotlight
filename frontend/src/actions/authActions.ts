import axios from 'axios'
import * as jwt from 'jsonwebtoken'

import { SET_CURRENT_USER } from './types'
import { setAuthorizationToken } from '../utils/setAuthorizationToken'

interface ICredentials {
    username: string
    password: string
}

export const login = (credentials: ICredentials) => {
    console.log('authActions.login()')
    return (dispatch: any) => {
        return axios.post('http://localhost:8000/api/login', credentials)
            .then(res => {
                const token = res.data.access_token
                localStorage.setItem('access_token', token)
                setAuthorizationToken(token)
                console.log(jwt.decode(token))
                axios.get('http://localhost:8000/api/user')
                    .then(res => {
                        const user = res.data
                        dispatch({
                            type: SET_CURRENT_USER,
                            payload: user
                        })
                    })
            })
    }
}