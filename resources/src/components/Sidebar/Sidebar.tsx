import classNames from 'classnames'
import React from 'react'
import ContentLoader from 'react-content-loader'
import { connect } from 'react-redux'

import { Icon, IconButton } from '@material-ui/core'
import { Theme, withTheme } from '@material-ui/core/styles'

import { ISnackbar, queueSnackbar } from '../../actions/snackbarActions'
import { IStaffUser } from '../../types/auth'

import { CheckInWidget } from '../CheckIn/CheckInWidget'
import NotificationsWidget from '../Modals/NotificationsWidget'
import { SearchWidget } from '../Modals/SearchWidget'
import StarredWidget from '../Modals/StarredWidget'
import AccountWidget from './AccountWidget'
import { HelpWidget } from './HelpWidget'
import { MenuItem } from './MenuItem'

interface IReduxProps {
	currentUser: IStaffUser
	queueSnackbar: (snackbar: ISnackbar) => void
}

interface IStyleProps {
	theme: Theme
}

interface IProps extends IReduxProps, IStyleProps {
	onSignOut: () => void
	onToggleMenuOpen: () => void
	loading?: boolean
	schoolName?: string
	schoolLogo?: string
}

class Sidebar extends React.Component<IProps> {
	render() {
		const style = {
			backgroundColor: this.props.theme.palette.primary.main
		}
		const isAdministrator: boolean = this.props.currentUser && this.props.currentUser.details.administrator === true

		return (
			<div className='sidebar'>
				<nav className='sidebar__nav' style={style}>
					{this.props.loading ? (
						<>
							<div style={{height: 200, width: 48}}>
								<ContentLoader height={196} width={48} primaryColor='#4f00bd' secondaryColor='#4a00b3'>
									<rect x={0} y={0} rx={24} ry={24} height={48} width={48}/>
									<rect x={6} y={64} rx={24} ry={24} height={36} width={36}/>
									<rect x={6} y={112} rx={24} ry={24} height={36} width={36}/>
									<rect x={6} y={160} rx={24} ry={24} height={36} width={36}/>
								</ContentLoader>
							</div>
							<div style={{height: 148, width: 48}}>
								<ContentLoader height={148} width={48} primaryColor='#4f00bd' secondaryColor='#4a00b3'>
									<rect x={6} y={0} rx={24} ry={24} height={36} width={36}/>
									<rect x={6} y={52} rx={24} ry={24} height={36} width={36}/>
									<rect x={0} y={100} rx={24} ry={24} height={48} width={48}/>
								</ContentLoader>
							</div>
						</>
					) : (
						<>
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
						</>
					)}
				</nav>
				<div className='sidebar__menu'>
					<div className='menu_content'>
						{this.props.loading ? (
							<div style={{height: 600, width: 256}}>
								<ContentLoader height={600} width={256}>
									<rect x={16} y={16} rx={4} ry={4} height={48} width={48}/>
									<rect x={72} y={32} rx={4} ry={4} height={16} width={96}/>
									<rect x={16} y={92} rx={24} ry={24} height={32} width={32}/>
									<rect x={64} y={100} rx={4} ry={4} height={16} width={64}/>
									<rect x={16} y={144} rx={24} ry={24} height={32} width={32}/>
									<rect x={64} y={152} rx={4} ry={4} height={16} width={176}/>
									<rect x={16} y={196} rx={24} ry={24} height={32} width={32}/>
									<rect x={64} y={204} rx={4} ry={4} height={16} width={96}/>
									<rect x={16} y={248} rx={24} ry={24} height={32} width={32}/>
									<rect x={64} y={256} rx={4} ry={4} height={16} width={64}/>
									<rect x={16} y={300} rx={24} ry={24} height={32} width={32}/>
									<rect x={64} y={308} rx={4} ry={4} height={16} width={80}/>
									<rect x={16} y={352} rx={24} ry={24} height={32} width={32}/>
									<rect x={64} y={360} rx={4} ry={4} height={16} width={136}/>
								</ContentLoader>
							</div>
						) : (
							<>
								{(!this.props.loading && this.props.schoolName) && (
									<div className='menu_header'>
										<div className={classNames('menu_header__logo', {['--logo']: this.props.schoolLogo})}>
											{this.props.schoolLogo && (
												<img src={`/static/images/logos/${this.props.schoolLogo}`} />
											)}
										</div>
										<h4>{this.props.schoolName}</h4>
									</div>
								)}
								<ul className='menu_list'>
									<MenuItem to='/check-in' icon='how_to_vote' label='Check-in' />
									<MenuItem to='/staff' icon='supervisor_account' label='Staff' />
									<MenuItem to='/students' icon='face' label='Students' />
									<MenuItem to='/power-scheduler' icon='offline_bolt' label='Power Scheduler' />
									{isAdministrator && (
										<>
											<MenuItem to='/credentials-manager' icon='security' label='Credentials Manager' />
										</>
									)}
								</ul>
							</>
						)}
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state: any) => ({
	currentUser: state.auth.user
})
const mapDispatchToProps = { queueSnackbar }

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(Sidebar))
