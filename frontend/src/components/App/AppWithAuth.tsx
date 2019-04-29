import * as React from 'react'

import App from './App'
import { Login } from '../Login'

import {
	BrowserRouter as Router, 
	Redirect,
	Route,
	Switch
} from 'react-router-dom'

type AuthState = 'signed-in' | 'sign-in' | 'sign-out'

interface Authentication {
	isAuthenticated: boolean
	authenticate: (cb?: () =>  void) => void
	signout: (cb?: () => void) => void 
}

interface IState {
	authState: AuthState
}

export default class AppWithAuth extends React.Component<{}, IState> {
	state: IState = {
		authState: 'signed-in'
	}

	authentication: Authentication = {
		isAuthenticated: true,
		authenticate(cb?: () => void) {
			this.isAuthenticated = true
			this.call(cb)
		},
		signout(cb?: () => void) {
			this.isAuthenticated = false
			this.call(cb)
		}
	}

	handleSignIn = (callback?: () => void) => {
		this.authentication.authenticate()
		this.setState({ authState: 'signed-in' }, callback)
	}

	handleSignOut = (callback?: () => void) => {
		this.authentication.signout()
		this.setState({ authState: 'sign-in' }, callback)
	}

	isAuthenticated = () => {
		return this.authentication.isAuthenticated
	}

	getAuthentication = (): boolean => {
		const accessToken: string = localStorage.getItem('accessToken')
		if (accessToken) {
			return true
		}
		this.handleSignOut()
		return false
	}

	componentDidMount() {

	}

	render() {
		return (
			<Router>
				<Switch>
					<Route
						path='/login'
						render={ (props) => <Login {...props} onSignIn={this.handleSignIn} /> }
					/>
					<Route path='/' render={(props) => {
						return this.isAuthenticated() ? (
							<App onSignOut={() => this.handleSignOut()}/>
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
		)
	}
}