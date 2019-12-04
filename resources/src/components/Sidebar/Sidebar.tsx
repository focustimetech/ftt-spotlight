import React from 'react'
import { RouteComponentProps } from 'react-router-dom'

import { Icon, IconButton } from '@material-ui/core'
import { Theme, withTheme } from '@material-ui/core/styles'

import { CheckInWidget } from '../CheckIn/CheckInWidget'
import AccountWidget from './AccountWidget'
import { HelpWidget } from './HelpWidget'
import NotificationsWidget from './NotificationsWidget'
import { SearchWidget } from './SearchWidget'
import SidebarMenu from './SidebarMenu'
import StarredWidget from './StarredWidget'

interface IStyleProps {
	theme: Theme
}

interface IProps extends IStyleProps {
	routeComponentProps: RouteComponentProps
	onSignOut: () => void
	onToggleMenuOpen: () => void
}

class Sidebar extends React.Component<IProps> {
	render() {
		const style = {
			backgroundColor: this.props.theme.palette.primary.main
		}

		return (
			<div className='sidebar'>
				<nav className='sidebar__nav' style={style}>
					<div className='nav_top'>
						<IconButton onClick={() => this.props.onToggleMenuOpen()}>
							<Icon>menu</Icon>
						</IconButton>
						<SearchWidget />
						<StarredWidget />
						<CheckInWidget />
					</div>
					<div className='nav_bottom'>
						<NotificationsWidget />
						<HelpWidget />
						<AccountWidget onSignOut={this.props.onSignOut} />
					</div>
				</nav>
				<SidebarMenu routeComponentProps={this.props.routeComponentProps} />
			</div>
		)
	}
}

export default withTheme(Sidebar)
