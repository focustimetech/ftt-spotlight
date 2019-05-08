import axios from 'axios'

import { FETCH_STUDENTS, NEW_STUDENT } from './types'

export const fetchStudents = (cb?: () => void) => (dispatch: any) => {
    axios.get('http://localhost:8000/api/students')
        .then((res: any) => dispatch({
            type: FETCH_STUDENTS,
            payload: res.data
        }, cb))
}

export const newStudent = () => {
    /*
    axios.post('http://localhost:8000/api/students', {
			first_name: this.state.newStudent.first_name,
			last_name: this.state.newStudent.last_name,
			initials: this.state.newStudent.first_name.slice(0, 1) + this.state.newStudent.last_name.slice(0, 1),
			student_number: this.state.newStudent.student_number,
			grade: this.state.newStudent.grade,
		})
			.then(res => {
				console.log(res)
            })
    */
}