import axios from 'axios'

import { FETCH_STUDENTS, NEW_STUDENT } from './types'

export const fetchStudents = () => (dispatch: any) => {
    axios.get('http://localhost:8000/api/students')
        .then((res: any) => dispatch({
            type: FETCH_STUDENTS,
            payload: res.data
        }))
}

export const createStudent = (studentData: any) => (dispatch: any) => {
    console.log('studentActions.createStudent()')
    axios.post('http://localhost:8000/api/students', studentData)
        .then((res: any) => dispatch({
            type: NEW_STUDENT,
            payload: res.data
        }))
        .catch(error => {
            console.log(error.message)
            console.log('Given data: ', studentData)
        })
}