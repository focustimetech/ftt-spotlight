import { IAction } from '../reducers/snackbarReducer'
import { DEQUEUE_SNACKBAR, QUEUE_SNACKBAR } from './types'

export interface ISnackbarLink {
    value: string
    href: string
}

export interface ISnackbarButton {
    value: string
    callback: () => any
}

export interface ISnackbar {
    message: string
    key?: string
    buttons?: ISnackbarButton[]
    links?: ISnackbarLink[]
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
