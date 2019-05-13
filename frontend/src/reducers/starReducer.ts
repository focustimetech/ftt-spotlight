import { FETCH_STARRED, STAR_ITEM, UNSTAR_ITEM } from '../actions/types'

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

export const starReducer = (state = initialState, action: IAction) => {
    switch (action.type) {
        case FETCH_STARRED:
            return {
                ...state,
                items: action.payload
            }
        case STAR_ITEM:
            return {
                ...state,
                item: action.payload
            }
        case UNSTAR_ITEM:
            return {
                ...state,
                items: state.items.filter((item: any) => item.id !== action.payload)
            }
        default:
            return state
    }
}
