import * as React from 'react'

import App from './App'
import { Login } from '../Login'

import {
	BrowserRouter as Router, 
	Redirect,
	Route,
	Switch,
	withRouter
} from 'react-router-dom'

type AuthState = 'signed-in' | 'sign-in' | 'sign-out'

interface IState {
	authState: AuthState
}

interface FakeAuth {
	isAuthenticated: boolean
	authenticate: (cb?: () =>  void) => void
	signout: (cb?: () => void) => void 
}

const fakeAuth: FakeAuth = {
	isAuthenticated: false,
	authenticate(cb?: () => void) {
		console.log('fakeAuth.authenticate()')
		this.isAuthenticated = true
		setTimeout(cb, 100) // fake async
	},
	signout(cb?: () => void) {
		console.log('fakeAuth.signout()')
		this.isAuthenticated = false
		setTimeout(cb, 100)
	}
}

interface ProtectedRouteProps {
	component: React.Component
}

/*
export const ProtectedRoute = ({component: Component}: ProtectedRouteProps, {...rest}) => {
	return (
		<Route {...rest} render={(props) => (
			fakeAuth.isAuthenticated ? (
				<Component {...props} />
			) : (
				<Redirect
					to={{
						pathname: '/login',
						state: { from: props.location }
					}}
				/>
			)
		)} />
	)
}
*/

export default class AppWithAuth extends React.Component<{}, IState> {
	state: IState = {
		authState: 'sign-in'
	}

	handleSignIn = (callback?: () => void) => {
		console.log('handleSignIn()')
		this.setState({ authState: 'signed-in' }, callback)
	}

	handleSignOut = (callback?: () => void) => {
		this.setState({ authState: 'sign-in' }, callback)
	}

	isAuthenticated = () => {
		return this.state.authState === 'signed-in'
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