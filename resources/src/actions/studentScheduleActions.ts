import axios from 'axios'

import { FETCH_STUDENT_SCHEDULE } from '../actions/types'

export interface IAppointmentRequest {
    student_id: number
    block_id: number
    date: string
    memo: string
}

export const createAppointment = (appointment: IAppointmentRequest): Promise<any> => {
    return axios.post('/api/appointments/create', appointment)
        .then((res: any) => {
            return res.data
        })
}

export const deleteAppointment = (appointmentID: number): Promise<any> => {
    const url = `/api/appointments/${appointmentID}`
    return axios.delete(url)
        .then((res: any) => {
            return res.data
        })
}

export const fetchStudentSchedule = (studentID?: number, dateTime?: string) => {
    let baseURL: string
    if (studentID)
        baseURL = `/api/students/${studentID}/schedule`
    else
        baseURL = '/api/students/self/schedule'
    return (dispatch: any) => {
        return axios.get(`${baseURL}${dateTime ? `/${dateTime}` : ''}`)
            .then((res: any) => {
                const schedule = res.data
                dispatch({
                    type: FETCH_STUDENT_SCHEDULE,
                    payload: schedule
                })
            })
    }
}