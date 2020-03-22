import React from 'react'

import {
    Avatar,
    Button,
    Icon,
    Typography
} from '@material-ui/core'

export interface IBannerAction {
    text: string
    callback: () => void
}

export interface IBannerContentProps {
    message: string
    actions?: IBannerAction[]
    icon?: string
}

export interface IBannerProps extends IBannerContentProps {
    onClose: () => void
}

const BannerContent = (props: IBannerProps) => {
    const handleClick = (callback: () => void) => {
        props.onClose()
        callback()
    }

    return (
        <div className='banner__content'>
            <div className='banner__message'>
                {props.icon && (
                    <Avatar className='banner__avatar'><Icon>{props.icon}</Icon></Avatar>
                )}
                <Typography>{props.message}</Typography>
            </div>
            <div className='banner__actions'>
                {props.actions && props.actions.map((action: IBannerAction, index: number) => (
                    <Button
                        key={index}
                        variant='text'
                        color='primary'
                        onClick={() => handleClick(action.callback)}
                    >
                        {action.text}
                    </Button>
                ))}
                <Button variant='text' color='primary' onClick={() => props.onClose()}>Close</Button>
            </div>
        </div>
    )
}

export { BannerContent }
