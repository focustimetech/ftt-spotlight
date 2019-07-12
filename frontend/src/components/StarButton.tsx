import * as React from 'react'
import { Icon, IconButton } from '@material-ui/core'

interface IProps {
    isStarred: boolean,
    onClick: () => void
}

export const StarButton = (props: IProps) => {
    return (
        <IconButton onClick={() => props.onClick()}>
            <Icon className={props.isStarred ? '--starred': ''}>
                {props.isStarred ? 'star' : 'star_border'}
            </Icon>
        </IconButton>
    )
}
