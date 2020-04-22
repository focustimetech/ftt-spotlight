import classNames from 'classnames'
import React from 'react'

import DefaultNavItems from './DefaultNavItems'
import FavoritesWidget from './FavoritesWidget'
import NavItem, { INavItemProps } from './NavItem'
import NavMenu from './NavMenu'
import NavMenuItem, { INavMenuItemProps } from './NavMenuItem'
import SearchWidget from './SearchWidget'

interface IVerticalNavProps {
    navItems?: INavItemProps[]
    menuItems?: INavMenuItemProps[]
}

class VerticalNav extends React.Component<IVerticalNavProps> {
    static getInitialProps = async () => {
        //
    }

    render() {
        return (
            <>
                <nav className={classNames('nav', '--vertical')}>
                    <div className='nav__group'>
                        <NavItem
                            className='nav__logo'
                            title='Spotlight'
                            href='/'
                            src='images/ft-badge-white.png'
                        />
                        <FavoritesWidget />
                        <SearchWidget />
                        {this.props.navItems && this.props.navItems.map((navItemProps: INavItemProps) => (
                            <NavItem {...navItemProps} />
                        ))}
                    </div>
                    <div className='nav__group'>
                        <DefaultNavItems />
                    </div>
                </nav>
                <NavMenu>
                    <NavMenuItem label='Check In' icon='alarm' />
                </NavMenu>
            </>
        )
    }
}

export default VerticalNav
