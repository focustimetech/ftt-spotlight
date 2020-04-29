import { DELETE_STAFF, FETCH_STAFF, NEW_STAFF, UPDATE_STAFF } from '../actions/types'

interface IState {
    items: any[],
    item: any
}

const initialState: IState = {
    items: [],
    item: {}
}

interface IAction {
    type: string,
    payload: any
}

export const staffReducer = (state = initialState, action: IAction) => {
    switch (action.type) {
        case FETCH_STAFF:
            return {
                ...state,
                items: action.payload
            }
        case NEW_STAFF:
            return {
                ...state,
                item: action.payload
            }
        case DELETE_STAFF:
            return {
                ...state,
                items: state.items.filter((item: any) => item.id !== action.payload)
            }
        case UPDATE_STAFF:
            return {
                ...state,
                items: [
                    ...state.items.filter((item: any) => item.id !== action.payload.id),
                    action.payload
                ]
            }
        default:
            return state
    }
}
