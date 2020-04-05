import { SET_CURRENT_USER } from '../actions/types'
import { ReduxAction } from '../types'
import { IUser } from '../types/auth'

interface IState {
    isAuthenticated: boolean,
    user: IUser
}

const initialState: IState = {
    isAuthenticated: false,
    user: null
}

export const authReducer = (state = initialState, action: ReduxAction<IUser>) => {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                isAuthenticated: Boolean(action.payload),
                user: action.payload
            }
        default:
            return state
    }
}
