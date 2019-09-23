import axios from 'axios'

import { FETCH_STUDENT_SCHEDULE, FETCH_STAFF_LIST } from '../actions/types'
import { IStaff } from '../types/staff'
import { ITopic } from '../types/calendar'

export interface IAppointmentRequest {
    student_id: number
    block_id: number
    date: string
    memo: string
}

export interface IStaffTopic {
    staff: IStaff
    topic?: ITopic
    num_scheduled: number
    num_remaining: number
}

export interface ISchedulePlanRequest {
    staff_id: number
    block_id: number
    date: string
}

export type IAmendmentRequest = IAppointmentRequest

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

export const fetchStaffList = (blockID: number, dateTime: string) => {
    const data: any = {
        block_id: blockID,
        date: dateTime
    }
    return (dispatch: any) => {
        return axios.post('/api/students/staff-list', data)
            .then((res: any) => {
                const staffTopics: IStaffTopic[] = res.data
                dispatch({
                    type: FETCH_STAFF_LIST,
                    payload: staffTopics
                })
            })
    }
}

export const setStudentPlan = (schedulePlan: ISchedulePlanRequest) => {
    return (dispatch: any) => {
        return axios.post('/api/students/schedule-plan', schedulePlan)
            .then((res: any) => {
                return res.data
            })
    }
}

export const createAmendment = (amendment: IAmendmentRequest) => {
    return (dispatch: any) => {
        return axios.post('/api/amendment', amendment)
            .then((res: any) => {
                return res.data
            })
    }
}
