import * as React from 'react'

import * as classNames from 'classnames'

import { AccountWidget } from '../Modals/AccountWidget'
import { MenuItem } from './MenuItem'
import { NavItem } from './NavItem'
import { NotificationsWidget } from '../Modals/NotificationsWidget'
import { CheckInWidget } from '../Modals/CheckInWidget'
import { SearchWidget } from '../Modals/SearchWidget'
import StarredWidget from '../Modals/StarredWidget'

interface IProps {
	onSignOut: () => void
}
/**
 * @TODO Need to handle the case where the screen is very narrow,
 * in which a modal nav manu should be used.
 */
export class Sidebar extends React.Component<IProps> {
	render() {
		return (
			<div className='sidebar'>
				<nav className='sidebar__nav'>
					<div className='nav_top'>
						<NavItem title='Spotlight' to='/' icon='home' />
						<SearchWidget />
						<StarredWidget />
						<CheckInWidget />
					</div>
					<div className='nav_bottom'>
						<NotificationsWidget />
						<NavItem title='Help' icon='help' />
						<AccountWidget onSignOut={this.props.onSignOut} />
						{/*<NavItem title='Account' icon='perm_identity' />*/}
						
					</div>
				</nav>
				<div className='sidebar__menu'>
					<div className='menu_header'>
						<div className='menu_header__logo'></div>
						<h4>Oak Bay High</h4>
					</div>
					<ul className='menu_list'>
						<MenuItem to='/staff' icon='supervisor_account' label='Staff' />
						{/*<MenuItem to='/students' icon='face' label='Students' />*/}
						<MenuItem to='/appointments' icon='access_time' label='Appointments' />
						<MenuItem to='/clusters' icon='group' label='Cluster' />
						<MenuItem to='/class-schedule' icon='date_range' label='Class Schedule' />
						<MenuItem to='/event' icon='event' label='Events' />
						<MenuItem to='/reporting' icon='assignment' label='Reporting' />
						<MenuItem to='/settings' icon='settings' label='Settings' />
						<MenuItem to='/parents' icon='contact_mail' label='Parents' />
					</ul>
				</div>
			</div>
		)
	}
}