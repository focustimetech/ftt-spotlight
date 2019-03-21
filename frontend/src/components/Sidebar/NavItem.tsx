import * as React from 'react'

import { Link } from 'react-router-dom'

import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'

interface IProps {
    icon: string
    title: string
    to?: string
    onClick?: () => void
}

export const NavItem = (props: IProps) => {
    const button = (
        <IconButton className='nav_button' onClick={props.onClick}>
            <Icon>{props.icon}</Icon>
        </IconButton>
    )
    return (
        <Tooltip title={props.title} placement='right'>
            {props.to ? (<Link to={props.to}>{button}</Link>) : (button)}
        </Tooltip>
    )
}