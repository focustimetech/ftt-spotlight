import classNames from 'classnames'
import { NextRouter, useRouter } from 'next/router'
import React from 'react'

import {
    Icon,
    IconButton,
    List,
    ListItemIcon,
    ListItemText,
    MenuItem,
    Paper
} from '@material-ui/core'

import NavMenuItem, { INavMenuItem } from './NavMenuItem'

interface INavMenuProps {
    children?: any
    menuItems?: INavMenuItem[]
}

const NavMenu = (props: INavMenuProps) => {
    const [expanded, setExpanded] = React.useState(true)
    const router: NextRouter = useRouter()

    return (
        <Paper>
            <List className={classNames('nav-menu', { '--expanded': expanded })}>
                {expanded ? (
                    <MenuItem className='nav-menu__toggle' onClick={() => setExpanded(!expanded)}>
                        <ListItemIcon><Icon>chevron_left</Icon></ListItemIcon>
                        <ListItemText>Close</ListItemText>
                    </MenuItem>
                ) : (
                    <li>
                        <IconButton onClick={() => setExpanded(!expanded)}>
                            <Icon>chevron_right</Icon>
                        </IconButton>
                    </li>
                )}
                {props.children}
                {props.menuItems && props.menuItems.map((menuItem) => {
                    return (
                        <NavMenuItem
                            {...menuItem}
                            useListItem={expanded}
                            active={router.pathname === menuItem.href}
                            key={menuItem.label}
                        />
                    )
                })}
            </List>
        </Paper>
    )
}

export default NavMenu
