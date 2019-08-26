import axios from 'axios'

import { FETCH_STAFF, NEW_STAFF, DELETE_STAFF, UPDATE_STAFF } from './types'

export interface StaffRequest {
    id?: number
    first_name: string
    last_name: string
    title: string
}

export const fetchStaff = () => (dispatch: any) => {
    return axios.get('http://localhost:8000/api/staff')
        .then((res: any) => dispatch({
            type: FETCH_STAFF,
            payload: res.data
        }))
}

export const createStaff = (staffData: StaffRequest) => (dispatch: any) => {
    return axios.post('http://localhost:8000/api/staffs', staffData)
        .then((res: any) => dispatch({
            type: NEW_STAFF,
            payload: res.data
        }))
}

export const deleteStaff = (staffID: number) => (dispatch: any) => {
    return axios.delete(`http://localhost:8000/api/staffs${staffID}`)
        .then((res: any) => dispatch({
            type: DELETE_STAFF,
            payload: res.data
        }))
}

export const updateStaff = (staffData: StaffRequest) => (dispatch: any) => {
    return axios.put('http://localhost:8000/api/staffs', staffData)
        .then((res: any) => dispatch({
            type: UPDATE_STAFF,
            payload: res.data
        }))
}