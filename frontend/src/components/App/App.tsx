import '../../assets/styles/main.scss'

import * as React from 'react'
import * as classNames from 'classnames'
import {
	BrowserRouter as Router, 
	Redirect,
	Route,
	Switch
} from 'react-router-dom'

import { ClassSchedule } from '../ClassSchedule'
import { Clusters } from '../Clusters'
import { Content } from '../Content'
import { Dashboard } from '../Dashboard'
import { NotFound } from '../NotFound'
import StudentProfile from '../StudentProfile'
import Students from '../Students'
import { Sidebar } from '../Sidebar/Sidebar'
import { Staff } from '../Staff'

interface IState {
	menuOpen: boolean
}

interface IProps {
	onSignOut: () => void
}

/*
interface ProtectedRouteProps {
	component: React.Component
}
*/

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
							<Switch>
								<Route path='/clusters/:clusterID?' component={Clusters} />
								<Route path='/' exact render={(props) => (
									<Redirect to='/dashboard' />
								)} />
								<Route exact path='/dashboard' component={Dashboard} />
								<Route path='/staff' component={Staff} />
								<Route path='/students/:studentID' component={StudentProfile} />
								<Route path='/students' component={Students} />
								<Route path='/class-schedule' component={ClassSchedule} />
								<Route component={NotFound} />
							</Switch>
						</Content>
					</div>
				</Router>
			</>
		)
	}
}