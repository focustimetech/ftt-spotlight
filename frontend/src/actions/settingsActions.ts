import axios from 'axios'

import { FETCH_SETTINGS } from './types'

export const fetchSettings = () => {
    return (dispatch: any) => {
        return axios.get('http://localhost:8000/api/settings')
            .then((res: any) => {
                const settings = res.data
                dispatch({
                    type: FETCH_SETTINGS,
                    payload: settings
                })
            })
    }
}
