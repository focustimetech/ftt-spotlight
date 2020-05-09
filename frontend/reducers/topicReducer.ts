import { DELETE_TOPIC, FETCH_TOPICS, NEW_TOPIC } from '../actions/types'
import { IReduxAction } from '../types/redux'
import { ITopic } from '../types/topic'

interface IState {
    items: ITopic[]
    item: ITopic
}

const initialState: IState = {
    items: [],
    item: null
}

export const topicReducer = (state = initialState, action: IReduxAction<ITopic>) => {
    switch (action.type) {
        case FETCH_TOPICS:
            return {
                ...state,
                items: action.payload
            }
        case NEW_TOPIC:
            return {
                ...state,
                item: action.payload,
                items: [...state.items, action.payload]
            }
        case DELETE_TOPIC:
            const deleted: number = state.items.findIndex((item: ITopic) => item.id === action.payload.id)
            return {
                ...state,
                item: state.items[deleted],
                items: state.items.splice(deleted, 1)
            }
        default:
            return state
    }
}
