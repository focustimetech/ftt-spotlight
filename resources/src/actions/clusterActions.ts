import axios from 'axios'

import {
    ATTACH_STUDENTS,
    DELETE_CLUSTER,
    DETATCH_STUDENTS,
    FETCH_CLUSTERS,
    NEW_CLUSTER,
    UPDATE_CLUSTER,
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
