import * as React from 'react'

import {
    Avatar,
    Button,
    Icon,
    Typography
} from '@material-ui/core'

export interface BannerAction {
    text: string
    callback: () => void
}

export interface BannerContentProps {
    message: string
    actions?: BannerAction[]
    icon?: string
}

export interface BannerProps extends BannerContentProps {
    
    onClose: () => void
}

const BannerContent = (props: BannerProps) => {
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
                {props.actions && props.actions.map((action: BannerAction, index: number) => (
                    <Button key={index} variant='text' color='primary' onClick={() => handleClick(action.callback)}>{action.text}</Button> 
                ))}
                <Button variant='text' color='primary' onClick={() => props.onClose()}>Close</Button>
            </div>
        </div>
    )
}

export { BannerContent }
