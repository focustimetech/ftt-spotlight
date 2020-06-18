import { IAppointment, INewAppointment } from '../types/appointment'
import { INewClassroom, IClassroom } from '../types/classroom'
import { IReduxAction } from '../types/redux'
import { FETCH_APPOINTMENTS, NEW_APPOINTMENT, DELETE_APPOINTMENT, NEW_CLASSROOM } from './types'
import API from '../utils/api'

export const fetchAppointments = () => {
    return (dispatch: (action: IReduxAction<IAppointment[]>) => void) => {
        return API.get('/appointments').then((res: any) => {
            dispatch({
                type: FETCH_APPOINTMENTS,
                payload: res.data
            })
        })
    }
}

export const createAppointment = (appointment: INewAppointment, classroom?: INewClassroom) => {
    const data = classroom ? {
        ...appointment,
        classroomName: classroom.name,
        classroomCapacity: classroom.capacity
    } : appointment
    return (dispatch: (action: IReduxAction<IAppointment | IClassroom>) => void) => {
        return API.post<IAppointment>('/appointments', data).then((res) => {
            const appointment: IAppointment = res.data
            dispatch({
                type: NEW_APPOINTMENT,
                payload: appointment
            })

            if (classroom) {
                dispatch({
                    type: NEW_CLASSROOM,
                    payload: { ...classroom, id: appointment.classroomId, teacherId: appointment.teacherId}
                })
            }
        })
    }
}

export const deleteAppointment = (appointmentId: number) => {
    return (dispatch: (action: IReduxAction<IAppointment>) => void) => {
        return API.delete(`/appointments/${appointmentId}`).then((res: any) => {
            dispatch({
                type: DELETE_APPOINTMENT,
                payload: res.data
            })
        })
    }
}
