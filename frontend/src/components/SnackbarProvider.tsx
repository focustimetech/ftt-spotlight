import * as React from 'react'
import {
    Button,
    Icon,
    IconButton,
    Slide,
    Snackbar,
    SnackbarContent
} from '@material-ui/core';
import { TransitionProps } from '@material-ui/core/transitions/transition'

export interface ISnackbarButton {
    text: string,
    closeOnCallback: boolean
    callback: () => any
}

export interface ISnackbar {
    message: string
    buttons?: ISnackbarButton[]
}

interface IProps {
    closeButton?: boolean
    snackbar: ISnackbar | null
    getNext: () => void
}

export const SnackbarProvider = (props: IProps) => {
    if (props.snackbar === null) {
        return null
    }

    const [open, setOpen] = React.useState(true)
    const closeButton: boolean = props.closeButton !== false
    const { snackbar } = props

    const handleExited = () => {
        props.getNext()
        window.setTimeout(() => setOpen(true), 200)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const snackbarContent = (
        <span>
            {snackbar.message}
            {snackbar.buttons && snackbar.buttons.map((button: ISnackbarButton) => {
                const onClick = () => {
                    if (button.closeOnCallback) {
                        handleClose()
                    }
                    button.callback()
                }
                return <Button onClick={onClick}>{button.text}</Button>
            })}
            {closeButton && (
                <IconButton onClick={handleClose}><Icon>close</Icon></IconButton>
            )}
        </span>
    )
    return (
        <Snackbar
            open={open}
            onClose={handleClose}
            onExited={handleExited}
            message={snackbarContent}
        />
    )
}
