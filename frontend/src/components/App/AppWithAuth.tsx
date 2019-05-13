import * as React from 'react'

import App from './App'
import Login from '../Login'

import {
	BrowserRouter as Router, 
	Redirect,
	Route,
	Switch
} from 'react-router-dom'

type AuthState = 'signed-in' | 'sign-in' | 'sign-out'

interface IState {
	authState: AuthState
}

export default class AppWithAuth extends React.Component<{}, IState> {
	state: IState = {
		authState: 'sign-in'
	}

	isAuthenticated = () => {
		return new Boolean(localStorage.access_token)
	}

	handleSignIn = () => {
		this.setState({ authState: 'signed-in' })
	}

	handleSignOut = () => {
		this.setState({ authState: 'sign-in' })
	}

	componentDidMount() {
		// this.setState({ authState: this.isAuthenticated ? 'signed-in' : 'sign-in' })
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
						return this.state.authState === 'signed-in' ? (
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
				</Switch>
			</Router>
		)
	}
}