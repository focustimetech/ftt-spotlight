import React from 'react'

import { IconButton } from '@material-ui/core'
import StarBorderRoundedIcon from '@material-ui/icons/StarBorderRounded'
import StarRoundedIcon from '@material-ui/icons/StarRounded'

interface IProps {
    disabled?: boolean
    isStarred: boolean,
    onClick: () => void
}

export const StarButton = (props: IProps) => {
    return (
        <IconButton onClick={() => props.onClick()} disabled={props.disabled}>
            {props.isStarred ? (
                <StarRoundedIcon className='--starred' />
            ) : (
                <StarBorderRoundedIcon />
            )}
        </IconButton>
    )
}
