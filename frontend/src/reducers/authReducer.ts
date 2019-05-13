import { SET_CURRENT_USER } from '../actions/types'

interface IState {
    isAuthenticated: boolean,
    /**
     * @TODO create interface for user
     */
    user: any
}

const initialState: IState = {
    isAuthenticated: false,
    user: {}
}

interface IAction {
    type: string,
    payload: any // user
}

export const authReducer = (state = initialState, action: IAction) => {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                isAuthenticated: new Boolean(action.payload),
                user: action.payload
            }
        default:
            return state
    }
}