import { ITeacher } from '../types/auth'
import API from '../utils/api'

export const fetchTeacher = (teacherId: number) => {
    return API.get<ITeacher>(`/teachers/${teacherId}`)
}
