import { FETCH_BLOCKS } from '../actions/types'
import { IBlock } from '../types/calendar'
import { IReduxAction } from '../types/redux'

interface IState {
    items: IBlock[]
}

const initialState: IState = {
    items: []
}

export const blockReducer = (state = initialState, action: IReduxAction) => {
    switch (action.type) {
        case FETCH_BLOCKS:
            return {
                ...state,
                items: action.payload
            }
        default:
            return state
    }
}
