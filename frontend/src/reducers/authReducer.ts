import { SET_CURRENT_USER, UNSET_CURRENT_USER } from '../actions/types'
import { ReduxAction } from '../types'
import { IUser } from '../types/auth'

interface IAuthReducerState {
    user: IUser
}

const initialState: IAuthReducerState = {
    user: null
}

export const authReducer = (state: IAuthReducerState = initialState, action: ReduxAction<IUser>): IAuthReducerState => {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                user: action.payload
            }
        case UNSET_CURRENT_USER:
            return initialState
        default:
            return state
    }
}
