import { QUEUE_SNACKBAR, DEQUEUE_SNACKBAR } from './types'
import { IAction } from '../reducers/snackbarReducer'

export interface ISnackbarButton {
    text: string
    callback: () => any
}

export interface ISnackbar {
    message: string
    buttons?: ISnackbarButton[]
}

export const queueSnackbar = (snackbar: ISnackbar) => (dispatch: (action: IAction) => void) => {
    return dispatch({
        type: QUEUE_SNACKBAR,
        payload: snackbar
    })
}

export const dequeueSnackbar = () => (dispatch: (action: IAction) => void) => {
    return dispatch({
        type: DEQUEUE_SNACKBAR,
        payload: null
    })
}