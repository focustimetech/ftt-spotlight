import axios from 'axios'

import { FETCH_STUDENTS, NEW_STUDENT, DELETE_STUDENT, UPDATE_STUDENT } from './types'

export interface StudentRequest {
    id?: number
    clusters?: any[]
    first_name: string
    last_name: string
    student_number: number
    grade: number
}

export const fetchStudents = () => (dispatch: any) => {
    axios.get('http://localhost:8000/api/students')
        .then((res: any) => dispatch({
            type: FETCH_STUDENTS,
            payload: res.data
        }))
}

export const createStudent = (studentData: StudentRequest) => (dispatch: any) => {
    axios.post('http://localhost:8000/api/students', studentData)
        .then((res: any) => dispatch({
            type: NEW_STUDENT,
            payload: res.data
        }))
}

export const deleteStudent = (studentID: number) => (dispatch: any) => {
    axios.delete(`http://localhost:8000/api/students${studentID}`)
        .then((res: any) => dispatch({
            type: DELETE_STUDENT,
            payload: res.data
        }))
}

export const updateStudent = (studentData: StudentRequest) => (dispatch: any) => {
    axios.put('http://localhost:8000/api/students', studentData)
        .then((res: any) => dispatch({
            type: UPDATE_STUDENT,
            payload: res.data
        }))
}