import classNames from 'classnames'
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

import NavMenuItem, { INavMenuItemProps } from './NavMenuItem'

interface INavMenuProps {
    children?: any
    menuItems?: INavMenuItemProps[]
}

const NavMenu = (props: INavMenuProps) => {
    const [expanded, setExpanded] = React.useState(true)
    console.log('expanded: ', expanded)

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
                {props.menuItems && props.menuItems.map((menuItemProps) => {
                    const itemProps = { ...menuItemProps, useListItem: expanded }
                    return <NavMenuItem {...itemProps} jey={itemProps.label} />
                })}
            </List>
        </Paper>
    )
}

export default NavMenu
