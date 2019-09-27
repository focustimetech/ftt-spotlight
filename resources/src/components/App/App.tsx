import '../../assets/styles/main.scss'

import * as React from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'
import {
	BrowserRouter as Router,
	Redirect,
	Route,
	RouteComponentProps,
	Switch
} from 'react-router-dom'

import { getCurrentUser } from '../../actions/authActions'
import { fetchSettings } from '../../actions/settingsActions'
import { IUser } from '../../types/auth'
import CheckIn from '../Views/CheckIn'
import { NotFound } from '../Views/NotFound'
import Settings from '../Views/Settings'
import Snackbar from '../Snackbar'
import StudentProfile from '../Views/StudentProfile'
import Students from '../Views/Students'
import Sidebar from '../Sidebar/Sidebar'
import Staff from '../Views/Staff'
import StaffProfile from '../Views/StaffProfile'
import { Splash } from './Splash'
import PowerScheduler from '../Views/PowerScheduler'

interface ReduxProps {
	getCurrentUser: () => any
	fetchSettings: () => any
	settings: any
	currentUser: IUser
}

interface IState {
	loadingUser: boolean
	loadingSettings: boolean
	passwordState: 'loading' | 'expired' | 'valid'
}

interface IProps extends ReduxProps {
	onSignOut: () => void
}

class App extends React.Component<IProps, IState> {
	state: IState = {
		loadingUser: true,
		loadingSettings: true,
		passwordState: 'loading'
	}

	handlePasswordChange = () => {
		this.setState({ passwordState: 'valid' })
	}

	componentDidMount() {
		this.props.getCurrentUser().then(
			() => {
				this.setState({
					loadingUser: false,
					passwordState: this.props.currentUser.password_expired ? 'expired' : 'valid'
				})
			},
			() => {
				this.props.onSignOut()
			}
		)
		this.props.fetchSettings().then(
			() => {
				this.setState({ loadingSettings: false })
			},
			() => {
				this.props.onSignOut()
			}
		)
	}

	render() {
		const passwordExpired: boolean = this.state.passwordState === 'expired'
		return this.state.loadingUser || this.state.loadingSettings || passwordExpired ? (
			<Splash
				passwordExpired={passwordExpired}
				username={this.props.currentUser ? this.props.currentUser.username : undefined}
				onSignOut={this.props.onSignOut}
				onChangePassword={this.handlePasswordChange}
			/>
		) : (
			<>
				<Router>
					<div className={classNames('site-wrap', '--menu_open')}>
						{
							this.props.currentUser.account_type === 'staff' ? <>
								<Sidebar
									onSignOut={this.props.onSignOut}
									loading={this.state.loadingUser || this.state.loadingSettings}
									schoolName={this.props.settings.values['school_name'].value || null}
								/>
								<Switch>
									<Route path='/' exact render={() => (
										<Redirect to='/students' />
									)} />
									<Route path='/check-in' component={CheckIn} />
									<Route path='/power-scheduler' component={PowerScheduler} />
									<Route path='/settings' component={Settings} />
									<Route path='/staff/:staffID' render={(props: RouteComponentProps) => (
										<StaffProfile {...props}/>
									)}/>
									<Route path='/staff' component={Staff} />
									<Route path='/students/:studentID' render={(props: RouteComponentProps) => (
										<StudentProfile {...props} />
									)}/>
									<Route path='/students' component={Students} />
									<Route component={NotFound} />
								</Switch>
							</> : <>
								<Switch>
									<Route path='/profile' render={(props: RouteComponentProps) => (
										<StudentProfile {...props} onSignOut={this.props.onSignOut} />
									)} />
									<Route render={() => (
										<Redirect to='/profile' />
									)} />
								</Switch>
							</>
						}
					</div>
					<Snackbar />
				</Router>
			</>
		)
	}
}

const mapDispatchToProps = {
	getCurrentUser,
	fetchSettings
}

const mapStateToProps = (state: any) => ({
	currentUser: state.auth.user,
	settings: state.settings.items
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
