import * as React from 'react'

import {
	BrowserRouter as Router, 
	Redirect,
	Route,
	Switch
} from 'react-router-dom'

import { setAuthorizationToken } from '../../utils/setAuthorizationToken'
import App from './App'
import Login from '../Views/Login'

export default class AppWithAuth extends React.Component {
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

	render() {
		return (
			<Router>
				<Switch>
					<Route
						path='/login'
						render={ (props) => <Login {...props} onSignIn={() => null} /> }
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
				</Switch>
			</Router>
		)
	}
}