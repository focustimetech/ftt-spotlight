import axios from 'axios'

import { FETCH_CHECKIN_STATUS, ENABLE_AIR, DISABLE_AIR, CHECK_IN } from './types'

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

export const enableAir = () => {
    return (dispatch: any) => {
        return axios.post('http://localhost:8000/api/check-in/air/enable')
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
        return axios.post('http://localhost:8000/api/check-in/air/disable')
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
    return (dispatch: any) => {
        return axios.post('http://localhost:8000/api/check-in/')
            .then((res: any) => {
                const status = res.data
                dispatch({
                    type: CHECK_IN,
                    payload: status
                })
            })
    }
}