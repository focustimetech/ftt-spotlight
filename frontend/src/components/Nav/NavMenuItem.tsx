import classNames from 'classnames'
import Link from 'next/link'
import React from 'react'

import {
    Icon,
    IconButton,
    ListItemIcon,
    ListItemText,
    MenuItem
} from '@material-ui/core'

export interface INavMenuItem {
    icon: string
    label: string
    href: string
}

interface INavMenuItemProps extends INavMenuItem {
    active: boolean
    useListItem: boolean
}

const NavMenuItem = (props: INavMenuItemProps & { useListItem: boolean }) => {
    const { active, href, icon, label, useListItem } = props
    const className: string = classNames('nav-menu__item', { '--active': active, '--expanded': !useListItem })

    return props.useListItem ? (
        <Link href={href}>
            <a>
                <MenuItem className={className}>
                    <ListItemIcon><Icon>{icon}</Icon></ListItemIcon>
                    <ListItemText>{label}</ListItemText>
                </MenuItem>
            </a>
        </Link>
    ) : (
        <li className={className}>
            <Link href={href}>
                <IconButton title={label}>
                    <Icon>{icon}</Icon>
                </IconButton>
            </Link>
        </li>
    )
}

export default NavMenuItem
