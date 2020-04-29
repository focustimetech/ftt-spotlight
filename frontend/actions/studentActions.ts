import axios from 'axios'

import { DELETE_STUDENT, FETCH_STUDENTS, NEW_STUDENT, UPDATE_STUDENT } from './types'

export interface IStudentRequest {
    id?: number
    clusters?: any[]
    first_name: string
    last_name: string
    student_number: number
    grade: number
}

export const fetchStudents = () => (dispatch: any) => {
    return axios.get('/api/students')
        .then((res: any) => dispatch({
            type: FETCH_STUDENTS,
            payload: res.data
        }))
}

export const createStudent = (studentData: IStudentRequest) => (dispatch: any) => {
    return axios.post('/api/students', studentData)
        .then((res: any) => dispatch({
            type: NEW_STUDENT,
            payload: res.data
        }))
}

export const deleteStudent = (studentID: number) => (dispatch: any) => {
    return axios.delete(`/api/students${studentID}`)
        .then((res: any) => dispatch({
            type: DELETE_STUDENT,
            payload: res.data
        }))
}

export const updateStudent = (studentData: IStudentRequest) => (dispatch: any) => {
    return axios.put('/api/students', studentData)
        .then((res: any) => dispatch({
            type: UPDATE_STUDENT,
            payload: res.data
        }))
}
