import * as React from 'react'
import * as classNames from 'classNames'
import { Icon, IconButton } from '@material-ui/core'

interface IProps {
    isStarred: boolean,
    onClick: () => void
}

export const Star = (props: IProps) => {
    return (
        <IconButton onClick={() => props.onClick()}>
            <Icon className={classNames({'--starred': props.isStarred})}>
                {props.isStarred ? 'star' : 'star_border'}
            </Icon>
        </IconButton>
    )
}
