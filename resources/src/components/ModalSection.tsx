import * as React from 'react'

import {
    Button,
    Collapse,
    Icon,
    Typography
} from '@material-ui/core'
import { SetState } from '../types/app'

interface IProps {
    children: any
    icon: string
    title: string
    collapsible?: boolean
    count?: boolean
    labelAdornment?: any
    open?: boolean
    onOpen?: () => void
    onClose?: () => void
}

export const ModalSection = (props: IProps) => {
    const [open, setOpen]: [boolean, SetState<boolean>] = React.useState(true)
    const isOpen: boolean = props.open !== false && (props.open || open)

    const handleHeaderClick = () => {
        if (props.collapsible === false)
            return
        if (open && props.onClose)
            props.onClose()
        else if (!open && props.onOpen)
            props.onOpen()
        setOpen(!open)
    }

    return (
        <div className='modal-section'>
            <div className='modal-section__header'>
                <Button
                    variant='text'
                    color='inherit'
                    onClick={handleHeaderClick}
                    className='modal-section__button'
                >
                    <Icon>{props.icon}</Icon>
                    <Typography className='button_text'>{props.title}</Typography>
                </Button>
                {props.labelAdornment}
            </div>
            <Collapse className='modal-section__content' in={isOpen}>
                {props.children}
            </Collapse>
        </div>
    )
}
