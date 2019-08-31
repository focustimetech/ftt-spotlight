import { QUEUE_SNACKBAR, DEQUEUE_SNACKBAR } from '../actions/types'
import { ISnackbar } from '../actions/snackbarActions'

interface IState {
    items: ISnackbar[],
    item: ISnackbar
}

const initialState: IState = {
    items: [],
    item: null
}

export interface IAction {
    type: string,
    payload: ISnackbar | null
}

export const snackbarReducer = (state = initialState, action: IAction) => {
    switch (action.type) {
        case QUEUE_SNACKBAR:
            return {
                ...state,
                items: [action.payload, ...state.items]
            }
        case DEQUEUE_SNACKBAR:
            return {
                item: state.items[state.items.length - 1] || null,
                items: state.items.slice(0, state.items.length - 1)
            }
        default:
            return state
    }
}
