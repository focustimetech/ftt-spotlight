import axios from 'axios'

import { FETCH_CHECKIN_STATUS, CHECK_IN } from './types'

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

export const checkIn = (input: string, dateTime?: string) => {
    const data: any = {
        student_numbers: input.split(','),
        date_time: dateTime
    }
    return (dispatch: any) => {
        return axios.post('/api/check-in', data)
            .then((res: any) => {
                const checkIn: any = res.data
                dispatch({
                    type: CHECK_IN,
                    payload: checkIn
                })
            })
    }
}
