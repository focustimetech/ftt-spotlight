import React from 'react'
import { connect } from 'react-redux'
import {
	BrowserRouter as Router,
	Redirect,
	Route,
	RouteComponentProps,
	Switch
} from 'react-router-dom'

import { getCurrentUser, logout } from '../../actions/authActions'
import { fetchSettings, fetchUnauthenticatedSettings } from '../../actions/settingsActions'
import { AuthState, IUser } from '../../types/auth'
import { setAuthorizationToken } from '../../utils/api'
import { ACCESS_TOKEN } from '../../utils/storage'

import ChangePasswordWidget from '../Modals/ChangePasswordWidget'
import Login from '../Views/Login'
import App from './App'
import { Splash } from './Splash'

interface IReduxProps {
	getCurrentUser: () => Promise<any>
	fetchSettings: () => Promise<any>
	fetchUnauthenticatedSettings: () => Promise<any>
	logout: () => Promise<any>
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

class AppWithAuth extends React.Component<IReduxProps, IState> {
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
		const token = localStorage.getItem(ACCESS_TOKEN)
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
		if (!this.state.loadingSettings || !this.state.loadingUser) {
			this.setState({ loadingSettings: true, loadingUser: true })
		}
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
		if (!this.state.loadingUnauthenticatedSettings) {
			this.setState({ loadingUser: false, loadingSettings: false, loadingUnauthenticatedSettings: true })
		}
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
		const isLoading: boolean
			= this.state.loadingUser || this.state.loadingSettings || this.state.loadingUnauthenticatedSettings
		const isAuthenticated: boolean = this.isAuthenticated()
		const showSplash: boolean = (isAuthenticated && (isLoading || passwordExpired)) || !this.state.loginImageLoaded

		return (
			<>
				<Splash in={showSplash} showChildren={passwordExpired || passwordCancelled}>
					<ChangePasswordWidget
						variant='persistant'
						disallowed={this.props.currentUser ? [this.props.currentUser.username] : undefined}
						onClose={this.handleSignOut}
						onSignOut={this.props.logout}
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
	fetchUnauthenticatedSettings,
	logout
}

const mapStateToProps = (state: any) => ({
	currentUser: state.auth.user,
	settings: state.settings.items
})

export default connect(mapStateToProps, mapDispatchToProps)(AppWithAuth)
