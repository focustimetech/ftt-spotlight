import classNames from 'classnames'
import React from 'react'

import { Icon, IconButton } from '@material-ui/core'

interface IProps {
    isStarred: boolean,
    onClick: () => void
}

export const StarButton = (props: IProps) => {
    return (
        <IconButton onClick={() => props.onClick()}>
            <Icon className={classNames('--starred', props.isStarred)}>
                {props.isStarred ? 'star' : 'star_border'}
            </Icon>
        </IconButton>
    )
}
