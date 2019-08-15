import axios from 'axios'

import { FETCH_CHECKIN_STATUS } from './types'

export const fetchCheckInStatus = () => {
    return (dispatch: any) => {
        return axios.get('http://localhost:8000/api/check-in/status/self')
            .then((res: any) => {
                const status = res.data
                dispatch({
                    type: FETCH_CHECKIN_STATUS,
                    payload: status
                })
            })
    }
}
