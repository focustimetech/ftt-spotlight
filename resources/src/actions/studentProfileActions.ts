import axios from 'axios'

import { FETCH_STUDENT_PROFILE } from './types'

export const fetchStudentProfile = (studentID: number) => {
    return (dispatch: any) => {
        return axios.get(`/api/students/profile/${studentID}`)
            .then((res: any) => {
                const student = res.data
                dispatch({
                    type: FETCH_STUDENT_PROFILE,
                    payload: student
                })
            })
    }
}
