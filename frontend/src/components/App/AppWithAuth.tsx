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
					render={ (props) => <Login {...props} onSignIn={this.handleSignIn} /> }
				/>
				<Route path='/' render={(props) => {
					return this.isAuthenticated() ? (
						<App onSignOut={this.handleSignOut}/>
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