import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'

import { Icon, IconButton } from '@material-ui/core'
import { Theme, withTheme } from '@material-ui/core/styles'

import SidebarMenu from './SidebarMenu'
import AccountWidget from './AccountWidget'
import NotificationsWidget from '../Modals/NotificationsWidget'
import { CheckInWidget } from '../CheckIn/CheckInWidget'
import { SearchWidget } from '../Modals/SearchWidget'
import StarredWidget from '../Modals/StarredWidget'
import { HelpWidget } from './HelpWidget'

interface StyleProps {
	theme: Theme
}

interface IProps extends StyleProps {
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
