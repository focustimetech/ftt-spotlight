import * as React from 'react'

import App from './App'
import { Login } from '../Login'

import {
	BrowserRouter as Router, 
	Redirect,
	Route,
	withRouter
} from 'react-router-dom'

type AuthState = 'signed-in' | 'sign-in' | 'sign-out'

interface IState {
	authState: AuthState
}

const fakeAuth = {
	isAuthenticated: false,
	authenticate(cb?: () => void) {
		console.log(cb)
		this.isAuthenticated = true
		setTimeout(cb, 100) // fake async
	},
	signout(cb?: () => void) {
		console.log(cb)
		this.isAuthenticated = false
		setTimeout(cb, 100)
	}
}

interface ProtectedRouteProps {
	component: React.Component
}

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

export default class AppWithAuth extends React.Component<{}, IState> {
	state: IState = {
		authState: 'sign-in'
	}

	handleSignIn = () => {
		console.log('handleSignIn()')
		this.setState({ authState: 'signed-in' })
	}

	handleSignOut = () => {
		this.setState({ authState: 'sign-in' })
	}

	isAuthenticated = () => {
		const ret = this.state.authState === 'signed-in'
		console.log('isAuthenticated => ', ret)
		return ret
	}

	render() {
		console.log('render()')
		return (
			<Router>
				<Route
					path='/login'
					render={ (props) => <Login {...props} onSignIn={() => fakeAuth.authenticate()} /> }
				/>
				<Route path='/' render={(props) => {
					return fakeAuth ? (
						<App onSignOut={() => fakeAuth.signout()}/>
					) : (
						<Redirect
							to={{
								pathname: '/login',
								state: { from: props.location }
							}}
						/>
					)
				}} />
			</Router>
		)
	}
}