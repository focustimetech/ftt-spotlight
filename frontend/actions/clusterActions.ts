import { Dispatch } from '../types/redux'
import API from '../utils/api'

import {
    ATTACH_STUDENTS,
    DELETE_CLUSTER,
    DETATCH_STUDENTS,
    FETCH_CLUSTERS,
    NEW_CLUSTER,
    UPDATE_CLUSTER,
} from './types'

export const dispatchClusters = () => (dispatch: Dispatch) => {
    return API.get('/clusters').then((res: any) => {
        dispatch({
            type: FETCH_CLUSTERS,
            payload: res.data
        })
    })
}
/*
export const attachStudents = (studentClusters: any) => (dispatch: any) => {
    return API.post('/clusters/students', studentClusters)
        .then((res: any) => dispatch({
            type: ATTACH_STUDENTS,
            payload: res.data
        }))
}

export const detatchStudents = (studentClusters: any) => (dispatch: any) => {
    return API.delete('/clusters/students', studentClusters)
        .then((res: any) => dispatch({
            type: DETATCH_STUDENTS,
            payload: res.data
        }))
}
*/
