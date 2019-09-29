import axios from 'axios'

import { FETCH_CHECKIN_STATUS, CHECK_IN } from './types'
import { ICheckInRequest } from '../types/checkin'

export const fetchCheckInStatus = (dateTime?: string) => {
    return (dispatch: any) => {
        return axios.get(dateTime ? `/api/check-in/status/${dateTime}` : '/api/check-in/status')
            .then((res: any) => {
                const status = res.data
                dispatch({
                    type: FETCH_CHECKIN_STATUS,
                    payload: status
                })
            })
    }
}

export const checkIn = (request: ICheckInRequest) => {
    return (dispatch: any) => {
        return axios.post('/api/check-in', request)
            .then((res: any) => {
                const checkIn: any = res.data
                dispatch({
                    type: CHECK_IN,
                    payload: checkIn
                })
            })
    }
}
