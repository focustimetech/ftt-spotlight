import { ICluster, INewCluster, IClusterPivot } from '../types/cluster'
import { Dispatch } from '../types/redux'
import API from '../utils/api'

import {
    ATTACH_STUDENTS,
    DELETE_CLUSTER,
    DETACH_STUDENTS,
    FETCH_CLUSTERS,
    NEW_CLUSTER,
    UPDATE_CLUSTER,
} from './types'

export const fetchClusters = () => (dispatch: Dispatch) => {
    return API.get('/clusters').then((res: any) => {
        dispatch({
            type: FETCH_CLUSTERS,
            payload: res.data
        })
    })
}

export const createCluster = (cluster: INewCluster) => (dispatch: Dispatch) => {
    return API.post('/clusters', cluster).then((res: any) => {
        dispatch({
            type: NEW_CLUSTER,
            payload: res.data
        })
    })
}

export const deleteCluster = (clusterId: number) => (dispatch: Dispatch) => {
    return API.post(`/clusters/${clusterId}`).then((res: any) => {
        dispatch({
            type: DELETE_CLUSTER,
            payload: res.data
        })
    })
}

export const addToCluster = (clusterId: number, studentIds: number[]) => (dispatch: any) => {
    const pivot: IClusterPivot = { studentIds, clusterId }
    dispatch({
        type: ATTACH_STUDENTS,
        payload: pivot
    })
    return API.post(`/clusters/${clusterId}/attach`, { studentIds })
}

export const removeFromCluster = (clusterId: number, studentIds: number[]) => (dispatch: any) => {
    const pivot: IClusterPivot = { studentIds, clusterId }
    dispatch({
        type: DETACH_STUDENTS,
        payload: pivot
    })
    return API.post(`/clusters/${clusterId}/detach`, { studentIds })
}
