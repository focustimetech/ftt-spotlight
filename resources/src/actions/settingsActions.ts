import axios from 'axios'

import { FETCH_SETTINGS } from './types'

export const fetchSettings = () => {
    return (dispatch: any) => {
        return axios.get('/api/settings')
            .then((res: any) => {
                const settings = res.data
                dispatch({
                    type: FETCH_SETTINGS,
                    payload: settings
                })
            })
    }
}

export const fetchUnauthenticatedSettings = () => {
    return (dispatch: any) => {
        return axios.get('/api/settings/unauthenticated')
            .then((res: any) => {
                const settings = res.data
                dispatch({
                    type: FETCH_SETTINGS,
                    payload: settings
                })
            })
    }
}
