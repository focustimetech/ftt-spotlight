import '../../assets/styles/main.scss'

import * as React from 'react'
import {
	BrowserRouter as Router, 
	Redirect,
	Route,
	Switch
	// withRouter
} from 'react-router-dom'

// import { ProtectedRoute as Route} from './AppWithAuth'

import { ClassSchedule } from '../ClassSchedule'
import { Content } from '../Content'
import { Dashboard } from '../Dashboard'
import { Student } from '../Profile/Student'
import { Students } from '../Students'
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

interface ProtectedRouteProps {
	component: React.Component
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
					<div className={classNames('site-wrap', {'--menu_open': this.state.menuOpen})}>
						<Sidebar onSignOut={this.props.onSignOut} />
						<Content>
							<Route path='/' exact render={(props) => (
								<Redirect to='/dashboard' />
							)} />
							<Route exact path='/dashboard' component={Dashboard} />
							<Route path='/staff' component={Staff} />
							<Switch>
								<Route path='/students/:studentID' component={Student} />
								<Route path='/students' component={Students} />
							</Switch>
							<Route path='/class-schedule' component={ClassSchedule} />
						</Content>
					</div>
				</Router>
			</>
		)
	}
}