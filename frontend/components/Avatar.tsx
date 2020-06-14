import classNames from 'classnames'
import React from 'react'

import { Avatar } from '@material-ui/core'

import { IAvatar } from '../types/auth'

export interface IAvatarProps {
    avatar: IAvatar
    className?: string
    size?: 'small' | 'medium' | 'large'
    status?: boolean
    active?: boolean
}

const SpotlightAvatar = (props: IAvatarProps) => {
    const { avatar, className, size, status, active } = props

    return (
        <div className={classNames('avatar', { '--status': status, '--active': active }, props.className)}>
            <Avatar
                className={classNames('avatar__component', `--${size || 'medium'}`)}
                style={props.avatar ? {background: `#${props.avatar.color}`} : undefined}
            >
                {props.avatar ? props.avatar.initials : undefined}
            </Avatar>
        </div>
    )
}

export default SpotlightAvatar
