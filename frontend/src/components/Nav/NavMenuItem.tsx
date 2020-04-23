import Link from 'next/link'
import React from 'react'

import {
    Icon,
    IconButton,
    ListItemIcon,
    ListItemText,
    MenuItem
} from '@material-ui/core'

export interface INavMenuItemProps {
    icon: string
    label: string
    href: string
}

const NavMenuItem = (props: INavMenuItemProps & { useListItem: boolean }) => {
    return props.useListItem ? (
        <Link href={props.href}>
            <a>
                <MenuItem className='nav-menu__item'>
                    <ListItemIcon><Icon>{props.icon}</Icon></ListItemIcon>
                    <ListItemText>{props.label}</ListItemText>
                </MenuItem>
            </a>
        </Link>
    ) : (
        <li className='nav-menu__item'>
            <Link href={props.href}>
                <IconButton title={props.label}>
                    <Icon>{props.icon}</Icon>
                </IconButton>
            </Link>
        </li>
    )
}

export default NavMenuItem
