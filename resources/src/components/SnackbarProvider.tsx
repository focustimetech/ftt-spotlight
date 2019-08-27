import * as React from 'react'
import {
    Button,
    Icon,
    IconButton,
    Snackbar
} from '@material-ui/core';
import { CSSProperties } from '@material-ui/styles';

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
    if (props.snackbar === null)
        return null

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

    const messageStyle: CSSProperties = {
        maxWidth: 400,
        overflow: 'hidden',
        textOverflow: 'ellipses'
    }

    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
            }}
            open={open}
            onClose={handleClose}
            onExited={handleExited}
            message={<span style={messageStyle}>{snackbar.message}</span>}
            action={[
                snackbar.buttons && snackbar.buttons.map((button: ISnackbarButton, index: number) => {
                    const onClick = () => {
                        if (button.closeOnCallback)
                            handleClose()
                        button.callback()
                    }
                    return <Button key={index} color='secondary' onClick={onClick}>{button.text}</Button>
                }),
                closeButton && (
                    <IconButton onClick={handleClose}><Icon>close</Icon></IconButton>
                )
            ]}
        />
    )
}
