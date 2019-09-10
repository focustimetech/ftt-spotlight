import axios from 'axios'

import { FETCH_CHECKIN_STATUS, ENABLE_AIR, DISABLE_AIR, CHECK_IN } from './types'

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

export const enableAir = () => {
    return (dispatch: any) => {
        return axios.post('/api/check-in/air/enable')
            .then((res: any) => {
                const status = res.data
                dispatch({
                    type: ENABLE_AIR,
                    payload: status
                })
            })
    }
}

export const disableAir = () => {
    return (dispatch: any) => {
        return axios.post('/api/check-in/air/disable')
            .then((res: any) => {
                const status = res.data
                dispatch({
                    type: DISABLE_AIR,
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
        //console.log('DATA:', data)
        return axios.post('/api/check-in', data)
            .then((res: any) => {
                const status = res.data
            })
    }
}