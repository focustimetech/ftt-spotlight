import classNames from 'classnames'
import React from 'react'

import { Avatar } from '@material-ui/core'

import { IAvatar } from '../types/auth'

interface IAvatarProps {
    avatar: IAvatar
    className?: string
    size?: 'small' | 'medium' | 'large'
}

const SpotlightAvatar = (props: IAvatarProps) => {
    let size: string
    switch (props.size) {
        case 'small':
            size = '--small'
            break
        case 'medium':
            size = '--medium'
            break
        case 'large':
            size = '--large'
            break
    }
    return (
        <Avatar
            className={classNames('avatar', size, props.className)}
            style={props.avatar ? {background: `#${props.avatar.color}`} : undefined}
        >
            {props.avatar ? props.avatar.initials : undefined}
        </Avatar>
    )
}

export default SpotlightAvatar
