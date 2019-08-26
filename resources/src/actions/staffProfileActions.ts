import axios from 'axios'

import { FETCH_STAFF_PROFILE } from './types'

export const fetchStaffProfile = (staffID: number) => {
    return (dispatch: any) => {
        return axios.get(`http://localhost:8000/api/staff/profile/${staffID}`)
            .then((res: any) => {
                const staff = res.data
                dispatch({
                    type: FETCH_STAFF_PROFILE,
                    payload: staff
                })
            })
    }
}
