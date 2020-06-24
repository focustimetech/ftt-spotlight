import axios from 'axios'

import { IStaff, IStaffTitle } from '../types/staff'
import { DELETE_STAFF, FETCH_STAFF, NEW_STAFF, UPDATE_STAFF } from './types'

export interface IStaffRequest {
    first_name: string
    last_name: string
    initials: string
    email: string
    title: IStaffTitle
    administrator: boolean
}

export const fetchStaff = () => (dispatch: any) => {
    return axios.get('/api/staff')
        .then((res: any) => dispatch({
            type: FETCH_STAFF,
            payload: res.data
        }))
}

export const createStaff = (staffData: IStaffRequest, password: string) => (dispatch: any) => {
    const data: IStaffRequest & { password: string} = { ...staffData, password }
    return axios.post('/api/staff', data)
        .then((res: any) => dispatch({
            type: NEW_STAFF,
            payload: res.data
        }))
}

export const deleteStaff = (staffID: number) => (dispatch: any) => {
    return axios.delete(`/api/staffs${staffID}`)
        .then((res: any) => dispatch({
            type: DELETE_STAFF,
            payload: res.data
        }))
}

export const updateStaff = (staffData: IStaff) => (dispatch: any) => {
    return axios.put('/api/staffs', staffData)
        .then((res: any) => dispatch({
            type: UPDATE_STAFF,
            payload: res.data
        }))
}

export const setCapacity = (capacity: number) => (dispatch: any) => {
    return axios.post('/api/staff/capacity', { capacity })
}
