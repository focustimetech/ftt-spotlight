import axios from 'axios'

import { LOGIN } from './types'
import { setAuthorizationToken } from '../utils/setAuthorizationToken'

interface ICredentials {
    username: string
    password: string
}

export const login = (credentials: ICredentials) => (dispatch: any) => {
    axios.post('http://localhost:8000/api/login', credentials)
        .then(res => {
            const token = res.data.token
            console.log('Token:', token)
            /**
             * @TODO Rename this key
             */
            localStorage.setItem('jwtToken', token)
            setAuthorizationToken(token)
            return dispatch({
                type: LOGIN,
                payload: token
            })
        })
}