import {
    ATTACH_STUDENTS,
    DELETE_CLUSTER,
    DETACH_STUDENTS,
    FETCH_CLUSTERS,
    NEW_CLUSTER,
    UPDATE_CLUSTER,
} from '../actions/types'
import { ICluster, IClusterPivot } from '../types/cluster'
import { IReduxAction } from '../types/redux'

interface IState {
    items: ICluster[]
}

const initialState: IState = {
    items: []
}

export const clustersReducer = (state = initialState, action: IReduxAction) => {
    let pivot: IClusterPivot
    let clusterIndex: number
    let clusters: ICluster[]
    switch (action.type) {
        case FETCH_CLUSTERS:
            return {
                ...state,
                items: action.payload
            }
        case NEW_CLUSTER:
            return {
                ...state,
                items: [...state.items, action.payload]
            }
        case ATTACH_STUDENTS:
            pivot = action.payload
            clusterIndex = state.items.findIndex((c: ICluster) => c.id === pivot.clusterId)
            clusters = [ ...state.items ]
            clusters[clusterIndex].studentIds = [
                ...clusters[clusterIndex].studentIds.filter((id: number) => !pivot.studentIds.some((studentId: number) => studentId === id)),
                ...pivot.studentIds
            ]
            return {
                ...state,
                items: clusters
            }
        case DETACH_STUDENTS:
            pivot = action.payload
            clusterIndex = state.items.findIndex((c: ICluster) => c.id === pivot.clusterId)
            clusters = [ ...state.items ]
            clusters[clusterIndex].studentIds = [
                ...clusters[clusterIndex].studentIds.filter((id: number) => !pivot.studentIds.some((studentId: number) => studentId === id))
            ]
            return {
                ...state,
                items: clusters
            }
            
        default:
            return state
    }
}
