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

import { MENU_OPEN } from '../../utils/localStorage/keys'

import NavMenuItem, { INavMenuItem } from './NavMenuItem'

interface INavMenuProps {
    menuItems: INavMenuItem[]
    children?: any
    hiddenMenuItems?: INavMenuItem[]
    disableHiddenMenu?: boolean
}

const NavMenu = (props: INavMenuProps) => {
    const [expanded, setExpanded] = React.useState(true)
    const [showHidden, setShowHidden] = React.useState(false)
    const router: NextRouter = useRouter()

    React.useEffect(() => {
        const menuState: any = localStorage.getItem(MENU_OPEN)
        if (menuState === null) {
            return
        }
        setExpanded(Boolean(Number(menuState)))
    }, [])

    const handleToggle = () => {
        localStorage.setItem(MENU_OPEN, !expanded ? '1' : '0')
        setExpanded(!expanded)
    }

    return (
        <Paper>
            <div className={classNames('nav-menu', { '--expanded': expanded })}>
                <Fade in={expanded} unmountOnExit={false}>
                    <div>
                        <List className={classNames('nav-menu__list', '--expanded')}>
                            <MenuItem className={classNames('nav-menu__toggle', 'nav-menu__item')} onClick={() => handleToggle()}>
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
                                    <MenuItem
                                        className='nav-menu__toggle'
                                        onClick={() => setShowHidden(!showHidden)}
                                        disabled={props.hiddenMenuItems.length === 0 || props.disableHiddenMenu}
                                    >
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
                                <IconButton onClick={() => handleToggle()}>
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
