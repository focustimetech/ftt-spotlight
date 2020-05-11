import classNames from 'classnames'
import React from 'react'

import DefaultNavItems from './DefaultNavItems'
import FavoritesWidget from './FavoritesWidget'
import NavItem, { INavItemProps } from './NavItem'
import NavMenu from './NavMenu'
import NavMenuItem, { INavMenuItem } from './NavMenuItem'
import SearchWidget from './SearchWidget'

export interface IHorizontalNavProps {
    navItems?: INavItemProps[]
    hasFavorites?: boolean
    noSearch?: boolean
    noSettings?: boolean
}

class HorizontalNav extends React.Component<IHorizontalNavProps> {
    static getInitialProps = async () => {
        //
    }

    componentDidMount() {
        console.log('Nav props:', this.props)
    }

    render() {
        return (
            <nav className={classNames('nav', '--horizontal')}>
                <div className='nav__group'>
                    <NavItem
                        className='nav__logo'
                        title='Spotlight'
                        href='/'
                        src='images/ft-badge-white.png'
                        orientation='horizontal'
                    />
                    {this.props.hasFavorites && (
                        <FavoritesWidget orientation='horizontal' />
                    )}
                    {!this.props.noSearch && (
                        <SearchWidget variant='bar' orientation='horizontal' />
                    )}
                    {this.props.navItems && this.props.navItems.map((navItemProps: INavItemProps) => (
                        <NavItem {...navItemProps} />
                    ))}
                </div>
                <div className='nav__group'>
                    <DefaultNavItems orientation='horizontal' noSettings={this.props.noSettings} />
                </div>
            </nav>
        )
    }
}

export default HorizontalNav
