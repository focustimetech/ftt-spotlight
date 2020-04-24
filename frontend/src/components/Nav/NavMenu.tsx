import classNames from 'classnames'
import { NextRouter, useRouter } from 'next/router'
import React from 'react'

import {
    Collapse,
    Divider,
    Fade,
    Grow,
    Icon,
    IconButton,
    List,
    ListItemIcon,
    ListItemText,
    MenuItem,
    Paper,
    Slide
} from '@material-ui/core'

import NavMenuItem, { INavMenuItem } from './NavMenuItem'

interface INavMenuProps {
    menuItems: INavMenuItem[]
    children?: any
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
            <div className={classNames('nav-menu', { '--expanded': expanded })}>
                <Fade in={expanded} unmountOnExit={false}>
                    <div>
                        <List className={classNames('nav-menu__list', '--expanded')}>
                            <MenuItem className={classNames('nav-menu__toggle', 'nav-menu__item')} onClick={() => setExpanded(!expanded)}>
                                <ListItemIcon><Icon>chevron_left</Icon></ListItemIcon>
                                <ListItemText>Close</ListItemText>
                            </MenuItem>
                            {props.menuItems.map((menuItem) => (
                                <NavMenuItem
                                    {...menuItem}
                                    useListItem
                                    active={router.pathname === menuItem.href}
                                    key={menuItem.label}
                                />
                            ))}
                            {props.hiddenMenuItems && (
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
                    </div>
                </Fade>
                <Fade in={!expanded} unmountOnExit={false}>
                    <div>
                        <List className='nav-menu__list'>
                            <li>
                                <IconButton onClick={() => setExpanded(!expanded)}>
                                    <Icon>chevron_right</Icon>
                                </IconButton>
                            </li>
                            {props.menuItems.map((menuItem) => (
                                <NavMenuItem
                                    {...menuItem}
                                    useListItem={false}
                                    active={router.pathname === menuItem.href}
                                    key={menuItem.label}
                                />
                            ))}
                        </List>
                    </div>
                </Fade>
            </div>
        </Paper>
    )
}

export default NavMenu
