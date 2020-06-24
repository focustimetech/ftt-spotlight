import classNames from 'classnames'
import Link from 'next/link'
import React from 'react'

import {
    Icon,
    IconButton,
    ListItemIcon,
    MenuItem,
    Tooltip,
    Typography
} from '@material-ui/core'

export interface INavMenuItem {
    icon: string
    label: string
    href?: string
    onClick?: (event?: React.MouseEvent<HTMLLIElement, MouseEvent>) => void
    as?: string
}

interface INavMenuItemProps extends INavMenuItem {
    active: boolean
    useListItem: boolean
}

const NavMenuItem = (props: INavMenuItemProps & { useListItem: boolean }) => {
    const { active, as, href, icon, label, onClick, useListItem } = props
    const className: string = classNames('nav-menu__item', { '--active': active, '--expanded': !useListItem })

    return props.useListItem ? (
        props.href ? (
            <Link href={href} as={as}>
                <a href={href}>
                    <MenuItem className={className}>
                        <ListItemIcon><Icon>{icon}</Icon></ListItemIcon>
                        <Typography variant='inherit' noWrap>{label}</Typography>
                    </MenuItem>
                </a>
            </Link>
        ) : (
            <MenuItem className={className} onClick={onClick}>
                <ListItemIcon><Icon>{icon}</Icon></ListItemIcon>
                <Typography variant='inherit' noWrap>{label}</Typography>
            </MenuItem>
        )
    ) : (
        <li className={className}>
            {props.href ? (
                <Link href={href}>
                    <a href={href}>
                        <Tooltip title={label} placement='right'>
                            <IconButton>
                                <Icon>{icon}</Icon>
                            </IconButton>
                        </Tooltip>
                    </a>
                </Link>
            ) : (
                <Tooltip title={label} placement='right'>
                    <IconButton>
                        <Icon>{icon}</Icon>
                    </IconButton>
                </Tooltip>
            )}
        </li>
    )
}

export default NavMenuItem
