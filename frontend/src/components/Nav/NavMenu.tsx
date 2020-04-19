import React from 'react'

import { Icon, IconButton } from '@material-ui/core'

import NavMenuItem, { INavMenuItemProps } from './NavMenuItem'

interface INavMenuProps {
    children?: any
    menuItems?: INavMenuItemProps[]
}

const NavMenu = (props: INavMenuProps) => {
    const [expanded, setExpanded] = React.useState(true)

    return (
        <ul className='nav-menu'>
            <li className='nav-menu__toggle'>
                <IconButton onClick={() => setExpanded(!expanded)}>
                    <Icon>{expanded ? 'chevron_left' : 'chevron_right'}</Icon>
                </IconButton>
            </li>
            {props.children}
            {props.menuItems && props.menuItems.map((menuItemProps) => (
                <NavMenuItem {...menuItemProps} />
            ))}
        </ul>
    )
}

export default NavMenu
