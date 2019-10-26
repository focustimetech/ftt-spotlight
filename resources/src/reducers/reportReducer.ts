import {
    FETCH_REPORTS,
    CREATE_REPORT,
    UPDATE_REPORT,
    DELETE_REPORT
} from '../actions/types'

interface IState {
    items: any[],
    item: any
}

const initialState: IState = {
    items: [],
    item: {}
}

interface IAction {
    type: string
    payload: any
}

export const reportReducer = (state: IState = initialState, action: IAction) => {
    switch (action.type) {
        case FETCH_REPORTS:
            return {
                ...state,
                items: action.payload
            }
        default:
            return state
    }
}
