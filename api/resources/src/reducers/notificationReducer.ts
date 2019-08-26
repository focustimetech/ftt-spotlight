import { FETCH_NOTIFICATIONS } from '../actions/types'
import { INotification } from '../types/staff'

interface IState {
    items: INotification[]
}

const initialState: IState = {
    items: []
}

interface IAction {
    type: string,
    payload: INotification[]
}

export const notificationReducer = (state = initialState, action: IAction) => {
    switch (action.type) {
        case FETCH_NOTIFICATIONS:
            return {
                items: action.payload
            }
        default:
            return state
    }
}
