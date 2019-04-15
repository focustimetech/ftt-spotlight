import '../../assets/styles/main.scss'

import * as React from 'react'
import {
	BrowserRouter as Router, 
	Redirect,
	Route,
	withRouter
} from 'react-router-dom'

import { Content } from '../Content'
import { Dashboard } from '../Dashboard'
import { Student } from '../Profile/Student'
import { Sidebar } from '../Sidebar/Sidebar'
import { Staff } from '../Staff'

import * as classNames from 'classnames'

// FIXME Remove login import
import { Schedule } from '../Schedule'

interface IState {
	menuOpen: boolean
}

interface IProps {
	onSignOut: () => void
}

export default class App extends React.Component<IProps, IState> {
	state: IState = {
		menuOpen: true
	}

	toggleMenu = (e: any): void => {
		this.setState({ menuOpen: this.state.menuOpen === false })
	}

	render() {
		return ( 
			<>
				<Router>
					{/*
					<Route path='/login' render={(props) => <Login {...props} onSignIn={this.handleSignIn} />} />
					*/}
					<div className={classNames('site-wrap', {'--menu_open': this.state.menuOpen})}>
						<Sidebar onSignOut={this.props.onSignOut} />
						<Content>
							<Route exact path='/' component={Dashboard} />
							<Route path='/staff' component={Staff} />
							<Route path='/students' component={Student} />
						</Content>
					</div>
				</Router>
			</>
		)
	}
}