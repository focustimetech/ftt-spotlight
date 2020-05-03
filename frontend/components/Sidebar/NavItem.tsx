import classNames from 'classnames'
import React from 'react'
import { Link } from 'react-router-dom'

import {
    Badge,
    Icon,
    IconButton,
    Tooltip
} from '@material-ui/core'

interface IProps {
    title: string
    badgeCount?: number
    children?: any
    className?: string
    icon?: string
    to?: string
    onClick?: (event?: any) => void
}

export const NavItem = (props: IProps) => {
    const content = props.icon ? <Icon>{props.icon}</Icon> : props.children
    const button = (
        <IconButton className={classNames('nav_button', props.className)} onClick={props.onClick}>
            {props.badgeCount ? (
                <Badge
                    badgeContent={props.badgeCount || 0}
                    color='secondary'
                    max={9}
                    invisible={props.badgeCount === 0}
                >
                    {content}
                </Badge>
            ) : (
                content
            )}
        </IconButton>
    )
    return (
        <Tooltip title={props.title} placement='right'>
            {props.to ? <Link to={props.to}>{button}</Link> : button}
        </Tooltip>
    )
}