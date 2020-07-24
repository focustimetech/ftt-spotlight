import classNames from 'classnames'
import { NextRouter, withRouter } from 'next/router'
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

interface INavMenuState {
    expanded: boolean
    showHidden: boolean
}

interface IRouterProps {
    router: NextRouter
}

class NavMenu extends React.Component<INavMenuProps & IRouterProps, INavMenuState> {
    state: INavMenuState = {
        expanded: false,
        showHidden: false,
    }

    toggleExpanded = () => {
        this.setState((state: INavMenuState) => {
            const expanded = !state.expanded
            localStorage.setItem(MENU_OPEN, expanded ? '1' : '0')
            return { expanded }
        })
    }

    toggleShowHidden = () => {
        this.setState((state: INavMenuState) => ({
            showHidden: !state.showHidden
        }))
    }

    componentWillMount() {
        if (typeof window === 'undefined') {
            return
        }
        this.setState({ expanded: Boolean(Number(localStorage.getItem(MENU_OPEN))) })
    }

    render() {
        console.log('NavMenu.state:', this.state)
        const { expanded, showHidden } = this.state
        const { menuItems, hiddenMenuItems, disableHiddenMenu, router } = this.props

        return (
            <Paper>
                <div className={classNames('nav-menu', { '--expanded': expanded })}>
                    <Fade in={expanded} unmountOnExit={false}>
                        <div>
                            <List className={classNames('nav-menu__list', '--expanded')}>
                                <MenuItem className={classNames('nav-menu__toggle', 'nav-menu__item')} onClick={() => this.toggleExpanded()}>
                                    <ListItemIcon><Icon>chevron_left</Icon></ListItemIcon>
                                    <ListItemText>Close</ListItemText>
                                </MenuItem>
                                {menuItems.map((menuItem) => (
                                    <NavMenuItem
                                        {...menuItem}
                                        useListItem
                                        active={router.asPath === menuItem.as}
                                        key={menuItem.label}
                                    />
                                ))}
                                {hiddenMenuItems && (
                                    <>
                                        <Collapse in={showHidden}>
                                            <div>
                                                <Divider />
                                                {hiddenMenuItems.map((menuItem: INavMenuItem) => (
                                                    <NavMenuItem
                                                        {...menuItem}
                                                        useListItem
                                                        active={router.asPath === menuItem.as}
                                                        key={menuItem.label}
                                                    />
                                                ))}
                                            </div>
                                        </Collapse>
                                        <MenuItem
                                            className='nav-menu__toggle'
                                            onClick={() => this.toggleShowHidden()}
                                            disabled={hiddenMenuItems.length === 0 || disableHiddenMenu}
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
                                    <IconButton onClick={() => this.toggleExpanded()}>
                                        <Icon>chevron_right</Icon>
                                    </IconButton>
                                </li>
                                {menuItems.map((menuItem) => (
                                    <NavMenuItem
                                        {...menuItem}
                                        useListItem={false}
                                        active={router.asPath === menuItem.as}
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
}

export default withRouter(NavMenu)
