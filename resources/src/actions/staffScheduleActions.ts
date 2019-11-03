import axios from 'axios'

import { FETCH_STAFF_SCHEDULE } from '../actions/types'

export const fetchStaffSchedule = (staffID: number, dateTime?: string) => {
    return (dispatch: any) => {
        return axios.get(`/api/staff/${staffID}/schedule${dateTime ? `/${dateTime}` : ''}`)
            .then((res: any) => {
                const schedule = res.data
                dispatch({
                    type: FETCH_STAFF_SCHEDULE,
                    payload: schedule
                })
            })
    }
}
