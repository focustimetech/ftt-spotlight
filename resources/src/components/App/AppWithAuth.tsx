import * as React from 'react'
import { connect } from 'react-redux'
import {
	BrowserRouter as Router,
	Redirect,
	Route,
	Switch,
	RouteComponentProps
} from 'react-router-dom'

import { setAuthorizationToken } from '../../utils/setAuthorizationToken'
import { getCurrentUser } from '../../actions/authActions'
import { fetchSettings, fetchUnauthenticatedSettings } from '../../actions/settingsActions'
import { AuthState, IUser } from '../../types/auth'
import { Splash } from './Splash'
import App from './App'
import Login from '../Views/Login'
import ChangePasswordWidget from '../Modals/ChangePasswordWidget'

interface ReduxProps {
	getCurrentUser: () => Promise<any>
	fetchSettings: () => Promise<any>
	fetchUnauthenticatedSettings: () => Promise<any>
	settings: any
	currentUser: IUser
}

interface IState {
	authState: AuthState
	failedSettings: boolean
	loadingUser: boolean
	loadingSettings: boolean
	loadingUnauthenticatedSettings: boolean
	loginImageLoaded: boolean
	passwordState: 'loading' | 'expired' | 'valid' | 'cancelled'
}

class AppWithAuth extends React.Component<ReduxProps, IState> {
	state: IState = {
		authState: 'sign-in',
		failedSettings: false,
		loadingUser: true,
		loadingSettings: true,
		loadingUnauthenticatedSettings: false,
		loginImageLoaded: false,
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

	handleSignOut = (authState?: AuthState) => {
		this.setState((state: IState) => {
			return {
				authState: state.authState !== 'sign-in' || state.authState === authState || !authState
					? state.authState
					: authState,
				passwordState: 'cancelled'
			}
		})
		setAuthorizationToken(null)
		this.forceUpdate()
	}

	onSignIn = (): Promise<any> => {
		this.setState({
			loadingSettings: true,
			loadingUser: true,
			passwordState: 'valid'
		})
		return this.fetchSettings()
			.then(() => {
				return this.fetchCurrentUser()
			}, () => {
				this.handleSignOut('failed-settings')
			})
	}

	handleLoginImageLoaded = () => {
		this.setState({ loginImageLoaded: true })
	}

	componentDidMount() {
		if (!this.state.loadingSettings || !this.state.loadingUser)
			this.setState({ loadingSettings: true, loadingUser: true })
		if (this.isAuthenticated()) {
			return this.fetchCurrentUser()
				.then(() => {
					this.props.fetchSettings()
						.then(() => {
							this.setState({ loadingSettings: false })
						}, () => {
							this.fetchUnauthenticatedSettings()
							this.handleSignOut('failed-settings')
						})
				}, () => {
					this.fetchUnauthenticatedSettings() // Fall back on unauthenticated settings	
					this.handleSignOut('unauthenticated')
				})
		} else {
			this.setState({ loadingUser: false, loadingSettings: false, loadingUnauthenticatedSettings: true })
			this.fetchUnauthenticatedSettings()
		}
	}

	fetchCurrentUser = (): Promise<any> => {
		return this.props.getCurrentUser()
			.then(() => {
				this.setState({
					loadingUser: false,
					passwordState: this.props.currentUser.password_expired ? 'expired' : 'valid'
				})
			})
	}

	fetchSettings = (): Promise<any> => {
		return this.props.fetchSettings()
			.then(() => {
				this.setState({ loadingSettings: false })
			})
	}

	fetchUnauthenticatedSettings = (): Promise<any> => {
		if (!this.state.loadingUnauthenticatedSettings)
			this.setState({ loadingUser: false, loadingSettings: false, loadingUnauthenticatedSettings: true })
		return this.props.fetchUnauthenticatedSettings()
			.then(() => {
				this.setState({ loadingUnauthenticatedSettings: false })
			}, () => {
				this.setState({ failedSettings: true })
			})
	}

	render() {
		const passwordExpired: boolean = this.state.passwordState === 'expired'
		const passwordCancelled: boolean = this.state.passwordState === 'cancelled'
		const isLoading: boolean = this.state.loadingUser || this.state.loadingSettings || this.state.loadingUnauthenticatedSettings
		const isAuthenticated: boolean = this.isAuthenticated()
		const showSplash: boolean = (isAuthenticated && (isLoading || passwordExpired)) || !this.state.loginImageLoaded
	
		return (
			<>
				<Splash in={showSplash} showChildren={passwordExpired || passwordCancelled}>
					<ChangePasswordWidget
						variant='persistant'
						disallowed={this.props.currentUser ? [this.props.currentUser.username] : undefined}
						onClose={this.handleSignOut}
						onChangePassword={this.handlePasswordChange}
					/>
				</Splash>
				<Router>
					<Switch>
						<Route
							path='/login'
							render={(props: RouteComponentProps) => (
								<Login
									{...props}
									onSignIn={this.onSignIn}
									authState={this.state.authState}
									failedSettings={this.state.failedSettings}
									onImageLoad={this.handleLoginImageLoaded}
								/>
							)}
						/>
						{!(isLoading || passwordExpired) && (
							<Route path='/' render={(props) => {
								return this.isAuthenticated() ? (
									<App
										onSignOut={this.handleSignOut}
										currentUser={this.props.currentUser}
										settings={this.props.settings}
										didMount={this.handleLoginImageLoaded}
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
						)}
					</Switch>
				</Router>
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
