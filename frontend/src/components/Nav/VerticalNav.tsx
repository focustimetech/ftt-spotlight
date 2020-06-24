import classNames from 'classnames'
import React from 'react'

import DefaultNavItems from './DefaultNavItems'
import FavoritesWidget from './Widgets/FavoritesWidget'
import NavItem, { INavItemProps } from './NavItem'
import NavMenu from './NavMenu'
import { INavMenuItem } from './NavMenuItem'
import SearchWidget from './Widgets/SearchWidget'

interface IVerticalNavProps {
    navItems?: INavItemProps[]
    menuItems?: INavMenuItem[]
    hiddenMenuItems?: INavMenuItem[]
    disableHiddenMenu?: boolean
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
                            src='/images/ft-badge-white.png'
                            orientation='vertical'
                        />
                        <FavoritesWidget orientation='vertical' />
                        <SearchWidget variant='drawer' orientation='vertical' />
                        {this.props.navItems && this.props.navItems.map((navItemProps: INavItemProps) => (
                            <NavItem {...navItemProps} />
                        ))}
                    </div>
                    <div className='nav__group'>
                        <DefaultNavItems orientation='vertical'/>
                    </div>
                </nav>
                <NavMenu
                    menuItems={this.props.menuItems}
                    hiddenMenuItems={this.props.hiddenMenuItems}
                    disableHiddenMenu={this.props.disableHiddenMenu}
                />
            </>
        )
    }
}

export default VerticalNav
