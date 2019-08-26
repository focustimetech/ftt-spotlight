import axios from 'axios'

import {
    FETCH_CLUSTERS,
    NEW_CLUSTER,
    DELETE_CLUSTER,
    UPDATE_CLUSTER,
    ATTACH_STUDENTS,
    DETATCH_STUDENTS
} from './types'

export const fetchClusters = () => (dispatch: any) => {
    return axios.get('/api/clusters')
        .then((res: any) => dispatch({
            type: FETCH_CLUSTERS,
            payload: res.data
        }))
}

export const attachStudents = (studentClusters: any) => (dispatch: any) => {
    return axios.post('/api/clusters/students', studentClusters)
        .then((res: any) => dispatch({
            type: ATTACH_STUDENTS,
            payload: res.data
        }))
}

export const detatchStudents = (studentClusters: any) => (dispatch: any) => {
    return axios.delete('/api/clusters/students', studentClusters)
        .then((res: any) => dispatch({
            type: DETATCH_STUDENTS,
            payload: res.data
        }))
}
