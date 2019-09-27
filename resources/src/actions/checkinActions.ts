import axios from 'axios'

import { FETCH_CHECKIN_STATUS, CHECK_IN } from './types'

export const fetchCheckInStatus = () => {
    return (dispatch: any) => {
        return axios.get('/api/check-in/status/self')
            .then((res: any) => {
                const status = res.data
                dispatch({
                    type: FETCH_CHECKIN_STATUS,
                    payload: status
                })
            })
    }
}

export const checkIn = (input: string) => {
    const data: any = {
        student_numbers: input.split(',')
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
