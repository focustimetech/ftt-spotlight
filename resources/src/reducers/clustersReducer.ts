import {
    FETCH_CLUSTERS,
    NEW_CLUSTER,
    DELETE_CLUSTER,
    UPDATE_CLUSTER,
    ATTACH_STUDENTS,
    DETATCH_STUDENTS
} from '../actions/types'

interface IState {
    prev: any[],
    next: any[]
}

const initialState: IState = {
    prev: [],
    next: []
}

interface IAction {
    type: string
    payload: any
}

export const clustersReducer = (state = initialState, action: IAction) => {
    switch (action.type) {
        case FETCH_CLUSTERS:
            return {
                ...state,
                prev: action.payload
            }
        case ATTACH_STUDENTS:
            return {
                ...state,
                prev: state.prev.filter((item: any) => action.payload.every((payloadItem: any) => item.id !== payloadItem.id)),
                next: action.payload
            }
    }
}