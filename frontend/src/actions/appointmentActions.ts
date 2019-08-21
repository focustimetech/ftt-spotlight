import axios from 'axios'
import { IAppointment } from '../types/calendar'

export interface IAppointmentRequest {
    student_id: number
    block_id: number
    date: string
    memo: string
}

export const createAppointment = (appointment: IAppointmentRequest): any => {
    return axios.post('http://localhost:8000/api/appointments/create', appointment)
        .then((res: any) => {
            return res.data
        })
}

export const deleteAppointment = (appointmentID: number) => {

}
