import * as React from 'react'
import { connect } from 'react-redux'
// import { CSSTransition, TransitionGroup } from 'react-transition-group'
import {
	BrowserRouter as Router,
	Redirect,
	Route,
	Switch,
	RouteComponentProps
} from 'react-router-dom'
import { Fade } from '@material-ui/core'

import { setAuthorizationToken } from '../../utils/setAuthorizationToken'
import { getCurrentUser } from '../../actions/authActions'
import { fetchSettings, fetchUnauthenticatedSettings } from '../../actions/settingsActions'
import { IUser } from '../../types/auth'
import { Splash } from './Splash'
import App from './App'
import Login from '../Views/Login'

interface ReduxProps {
	getCurrentUser: () => Promise<any>
	fetchSettings: () => Promise<any>
	fetchUnauthenticatedSettings: () => Promise<any>
	settings: any
	currentUser: IUser
}

interface IState {
	loadingUser: boolean
	loadingSettings: boolean
	loaded: boolean
	passwordState: 'loading' | 'expired' | 'valid'
}

class AppWithAuth extends React.Component<ReduxProps> {
	state: IState = {
		loadingUser: true,
		loadingSettings: true,
		loaded: false,
		passwordState: 'loading'
	}

	handlePasswordChange = () => {
		this.setState({ passwordState: 'valid' })
	}

	isAuthenticated = () => {
		const token = localStorage.access_token
		if (token) {
			return true
		} else {
			return false
		}
	}

	handleSignOut = () => {
		this.setState({ authState: 'sign-in' })
		setAuthorizationToken(null)
		this.forceUpdate()
	}

	onSignIn = (): Promise<any> => {
		return this.props.fetchSettings().then(() => {
			return this.props.getCurrentUser()
		})
	}

	onLoaded = () => {
		this.setState({ loaded: true })
	}

	componentDidMount() {
		if (this.isAuthenticated()) {
			this.setState({ loadingUser: true })
			this.props.getCurrentUser()
				.then(() => {
					this.setState({
						loadingUser: false,
						passwordState: this.props.currentUser.password_expired ? 'expired' : 'valid'
					})
				},
				() => {
					this.handleSignOut()
				})
			this.props.fetchSettings()
				.then(() => {
					this.setState({ loadingSettings: false })
				},
				() => {
					this.handleSignOut()
				})
		} else {
			this.setState({ loadingUser: false })
			this.props.fetchUnauthenticatedSettings()
				.then(() => {
					this.setState({ loadingSettings: false })
				})			
		}
	}

	render() {
		const passwordExpired: boolean = this.state.passwordState === 'expired'
		const isLoading: boolean = this.state.loadingUser || this.state.loadingSettings || passwordExpired
		console.log('isLoading:', isLoading)
		return (
			<>
				<Fade in={isLoading} timeout={{enter: 0, exit: 500 }} >
					<div>
						<Splash
							passwordExpired={passwordExpired}
							username={this.props.currentUser ? this.props.currentUser.username : undefined}
							onSignOut={this.handleSignOut}
							onChangePassword={this.handlePasswordChange}
						/>
					</div>
				</Fade>
				{!isLoading && (
					<Router>
						<Switch>
							<Route
								path='/login'
								render={(props: RouteComponentProps) => <Login {...props} onSignIn={this.onSignIn} /> }
							/>
							<Route path='/' render={(props) => {
								return this.isAuthenticated() ? (
									<App
										onSignOut={this.handleSignOut}
										currentUser={this.props.currentUser}
										settings={this.props.settings}
									/>
								) : (
									<Redirect
										to={{
											pathname: '/login',
											state: { from: props.location }
										}}
									/>
								)
							}} />
						</Switch>
					</Router>
				)}
			</>
		)
	}
}

const mapDispatchToProps = {
	getCurrentUser,
	fetchSettings,
	fetchUnauthenticatedSettings
}

const mapStateToProps = (state: any) => ({
	currentUser: state.auth.user,
	settings: state.settings.items
})

export default connect(mapStateToProps, mapDispatchToProps)(AppWithAuth)
