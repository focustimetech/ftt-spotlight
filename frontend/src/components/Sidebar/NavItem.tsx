import * as React from 'react'

import { Link } from 'react-router-dom'

import Badge from '@material-ui/core/Badge'
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'

interface IProps {
    title: string
    badgeCount?: number
    children?: any
    icon?: string
    to?: string
    onClick?: () => void
}

export const NavItem = (props: IProps) => {
    const content = props.icon ? <Icon>{props.icon}</Icon> : props.children
    const button = (
        <IconButton className='nav_button' onClick={props.onClick}>
            {props.badgeCount
            ? <Badge
                badgeContent={props.badgeCount || 0}
                color='primary'
                max={9}
                invisible={props.badgeCount === 0}
            >
                {content}
            </Badge>
            : content}            
        </IconButton>
    )
    return (
        <Tooltip title={props.title} placement='right'>
            {props.to ? <Link to={props.to}>{button}</Link> : button}
        </Tooltip>
    )
}