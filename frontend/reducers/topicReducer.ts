import { DELETE_TOPIC, FETCH_TOPICS, NEW_TOPIC } from '../actions/types'
import { ReduxAction } from '../types/app'
import { ITopic } from '../types/calendar'

interface IState {
    items: any[]
    item: any
}

const initialState: IState = {
    items: [],
    item: {}
}

export const topicReducer = (state = initialState, action: ReduxAction<ITopic>) => {
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
            return {
                ...state,
                items: state.items.filter((item: any) => (
                    item.id !== action.payload.id
                ))
            }
        default:
            return state
    }
}
