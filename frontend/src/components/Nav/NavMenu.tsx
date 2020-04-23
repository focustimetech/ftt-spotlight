import classNames from 'classnames'
import { NextRouter, useRouter } from 'next/router'
import React from 'react'

import {
    Collapse,
    Divider,
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
    hiddenMenuItems?: INavMenuItem[]
}

const NavMenu = (props: INavMenuProps) => {
    const [expanded, setExpanded] = React.useState(true)
    const [showHidden, setShowHidden] = React.useState(false)
    const router: NextRouter = useRouter()

    React.useEffect(() => {
        // Fetch expanded state from localStorage
    })

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
                {props.hiddenMenuItems && expanded && (
                    <>
                        <Collapse in={showHidden}>
                            <div>
                                <Divider />
                                {props.hiddenMenuItems.map((menuItem: INavMenuItem) => (
                                    <NavMenuItem
                                        {...menuItem}
                                        useListItem
                                        active={router.pathname === menuItem.href}
                                        key={menuItem.label}
                                    />
                                ))}
                            </div>
                        </Collapse>
                        <MenuItem className='nav-menu__toggle' onClick={() => setShowHidden(!showHidden)}>
                            <ListItemIcon><Icon>{showHidden ? 'expand_less' : 'expand_more'}</Icon></ListItemIcon>
                            <ListItemText>{showHidden ? 'Show less' : 'Show more'}</ListItemText>
                        </MenuItem>
                    </>
                )}
            </List>
        </Paper>
    )
}

export default NavMenu
