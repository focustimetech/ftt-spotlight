import axios from 'axios'
import { IAppointment } from '../types/calendar'

export interface IAppointmentRequest {
    student_id: number
    block_id: number
    date: string
    memo: string
}

export const createAppointment = (appointment: IAppointmentRequest): Promise<any> => {
    return axios.post('http://localhost:8000/api/appointments/create', appointment)
        .then((res: any) => {
            return res.data
        })
}

export const deleteAppointment = (appointmentID: number): Promise<any> => {
    const url = `http://localhost:8000/api/appointments/${appointmentID}`
    return axios.delete(url)
        .then((res: any) => {
            return res.data
        })
}
