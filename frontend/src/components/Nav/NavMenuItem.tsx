import Link from 'next/link'
import React from 'react'

import {
    Icon,
    IconButton,
    ListItemText
} from '@material-ui/core'

export interface INavMenuItemProps {
    icon: string
    label: string
    href?: string
    onClick?: () => void
}

const NavMenuItem = (props: INavMenuItemProps & { useListItem: boolean }) => {
    const listItem = props.useListItem ? (
        <a onClick={props.onClick}>
            <Icon>{props.icon}</Icon>
            <ListItemText>{props.label}</ListItemText>
        </a>
    ) : (
        <IconButton title={props.label} onClick={props.onClick}>
            <Icon>{props.icon}</Icon>
        </IconButton>
    )

    console.log('useListItem', props.useListItem)
    return (
        <li className='nav-menu__item'>
            {props.href ? (
                <Link href={props.href}>{listItem}</Link>
            ) : (
                listItem
            )}
        </li>
    )
}

export default NavMenuItem
