import axios from 'axios'

import { ICheckInRequest, ICheckInResponse } from '../types/checkin'
import { CHECK_IN, FETCH_CHECKIN_STATUS } from './types'

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
    if (!request.date) {
        request.date = new Date().toISOString()
    }
    return (dispatch: any) => {
        return axios.post('/api/check-in', request)
            .then((res: any) => {
                const checkInResponse: ICheckInResponse = res.data
                dispatch({
                    type: CHECK_IN,
                    payload: checkInResponse
                })
            })
    }
}
