import axios from 'axios'

import { FETCH_STUDENT_SCHEDULE } from '../actions/types'

export const fetchStudentSchedule = (studentID: number, dateTime?: string) => {
    return (dispatch: any) => {
        return axios.get(`http://localhost:8000/api/students/${studentID}/schedule${dateTime ? `/${dateTime}` : ''}`)
            .then((res: any) => {
                const schedule = res.data
                dispatch({
                    type: FETCH_STUDENT_SCHEDULE,
                    payload: schedule
                })
            })
    }
}