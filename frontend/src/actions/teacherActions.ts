import { ITeacher } from '../types/auth'
import API from '../utils/api'
import { FETCH_TEACHERS } from './types'

export const fetchTeachers = () => (dispatch: any) => {
    return API.get<ITeacher[]>('/teachers')
        .then((res) => dispatch({
            type: FETCH_TEACHERS,
            payload: res.data
        }))
}

export const fetchTeacher = (teacherId: number) => {
    return API.get<ITeacher>(`/teachers/${teacherId}`)
}
