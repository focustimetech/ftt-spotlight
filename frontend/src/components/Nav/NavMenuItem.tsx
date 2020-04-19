import Link from 'next/link'
import React from 'react'

import { Icon, ListItemText, Typography } from '@material-ui/core'

export interface INavMenuItemProps {
    icon: string
    label: string
    href?: string
    onClick?: () => void
}

const NavMenuItem = (props: INavMenuItemProps) => {
    const ListItem = () => (
        <a onClick={() => props.onClick()}>
            <Icon>{props.icon}</Icon>
            <ListItemText>{props.label}</ListItemText>
        </a>
    )

    return (
        <li className='nav-menu__item'>
            {props.href ? (
                <Link href={props.href}><ListItem /></Link>
            ) : (
                <ListItem />
            )}
        </li>
    )
}

export default NavMenuItem
