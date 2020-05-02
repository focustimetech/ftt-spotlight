import {
    ATTACH_STUDENTS,
    DELETE_CLUSTER,
    DETATCH_STUDENTS,
    FETCH_CLUSTERS,
    NEW_CLUSTER,
    UPDATE_CLUSTER,
} from '../actions/types'
import { ICluster } from '../types/cluster'
import { IReduxAction } from '../types/redux'

interface IState {
    items: ICluster[]
}

const initialState: IState = {
    items: []
}

export const clustersReducer = (state = initialState, action: IReduxAction) => {
    switch (action.type) {
        case FETCH_CLUSTERS:
            return {
                ...state,
                items: action.payload
            }
        /*
        case ATTACH_STUDENTS:
            return {
                ...state,
                prev: state.prev.filter((item: any) => (
                    action.payload.every((payloadItem: any) => item.id !== payloadItem.id)
                )),
                next: action.payload
            }
        */

        default:
            return state
    }
}
