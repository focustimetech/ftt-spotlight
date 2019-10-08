import { FETCH_USERS, INVALIDATE_PASSWORD, RESET_PASSWORD, DISABLE_USER } from '../actions/types'
import { IUser } from '../types/auth';

interface IState {
    items: IUser[]
}

const initialState: IState = {
    items: []
}

interface IAction {
    type: string,
    payload: any
}

export const usersReducer = (state = initialState, action: IAction) => {
    switch (action.type) {
        case FETCH_USERS:
            return {
                ...state,
                items: action.payload
            }
        default:
            return state
    }
}
