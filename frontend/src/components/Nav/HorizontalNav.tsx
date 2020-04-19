import classNames from 'classnames'
import React from 'react'

import DefaultNavItems from './DefaultNavItems'
import FavoritesWidget from './FavoritesWidget'
import NavItem, { INavItemProps } from './NavItem'
import NavMenu from './NavMenu'
import NavMenuItem, { INavMenuItemProps } from './NavMenuItem'
import SearchWidget from './SearchWidget'

interface IHorizontalNavProps {
    navItems?: INavItemProps[]
    hasFavorites?: boolean
}

class HorizontalNav extends React.Component<IHorizontalNavProps> {
    static getInitialProps = async () => {
        //
    }

    render() {
        return (
            <nav className={classNames('nav', '--horizontal')}>
                <div>
                    <NavItem
                        title='Spotlight'
                        href='/'
                        src='images/ft-badge.svg'
                    />
                    {this.props.hasFavorites && (
                        <FavoritesWidget />
                    )}
                    <SearchWidget />
                    {this.props.navItems && this.props.navItems.map((navItemProps: INavItemProps) => (
                        <NavItem {...navItemProps} />
                    ))}
                </div>
                <div>
                    <DefaultNavItems />
                </div>
            </nav>
        )
    }
}

export default HorizontalNav
