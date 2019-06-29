import { FETCH_SETTINGS } from '../actions/types'

export interface IState {
    items: any[]
}

const initialState: IState = {
    items: []
}

interface IAction {
    type: string,
    payload: any
}

export const settingsReducer = (state: IState = initialState, action: IAction) => {
    switch (action.type) {
        case FETCH_SETTINGS:
            return {
                ...state,
                items: action.payload
            }
        default:
            return state
    }
}
