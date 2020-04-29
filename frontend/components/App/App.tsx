import '../../assets/styles/main.scss'

import classNames from 'classnames'
import React from 'react'
import {
	BrowserRouter as Router,
	Redirect,
	Route,
	RouteComponentProps,
	Switch
} from 'react-router-dom'

import { IUser } from '../../types/auth'
import { getObjectFromLocalStorage, MENU_OPEN, writeObjectToLocalStorage } from '../../utils/storage'

import CheckIn from '../CheckIn/CheckIn'
import Reporting from '../Reporting/Reporting'
import Sidebar from '../Sidebar/Sidebar'
import Snackbar from '../Snackbar'
import CredentialsManager from '../Views/CredentialsManager'
import { NotFound } from '../Views/NotFound'
import PowerScheduler from '../Views/PowerScheduler'
import Settings from '../Views/Settings'
import Staff from '../Views/Staff'
import StaffProfile from '../Views/StaffProfile'
import StudentProfile from '../Views/StudentProfile'
import Students from '../Views/Students'
import Wiki from '../Wiki/Wiki'

interface IProps {
	currentUser: IUser
	onSignOut: () => void
	didMount: () => void
}

interface IState {
	menuOpen: boolean
}

export default class App extends React.Component<IProps, IState> {
	state: IState = {
		menuOpen: true
	}

	handleToggleMenuOpen = () => {
		this.setState((state: IState) => {
			writeObjectToLocalStorage(MENU_OPEN, !state.menuOpen === true ? 1 : 0)
			return {
				menuOpen: !state.menuOpen
			}
		})
	}

	componentDidMount() {
		const localStorageMenuOpen = getObjectFromLocalStorage(MENU_OPEN)
		if (localStorageMenuOpen === null) {
			writeObjectToLocalStorage(MENU_OPEN, 1)
		} else {
			this.setState({ menuOpen: Boolean(localStorageMenuOpen)})
		}
		this.props.didMount()
	}

	render() {
		return (
			<>
				<Router>
					<div className={classNames('site-wrap', {'--menu_open': this.state.menuOpen})}>
						{['staff', 'sysadmin'].includes(this.props.currentUser.account_type) ? (
							<>
								<Route render={(props: RouteComponentProps) => (
									<Sidebar
										routeComponentProps={props}
										onSignOut={this.props.onSignOut}
										onToggleMenuOpen={this.handleToggleMenuOpen}
									/>
								)} />
								<Switch>
									<Route path='/' exact render={() => <Redirect to='/check-in' />} />
									<Route path='/check-in' render={(props: RouteComponentProps) => (<CheckIn {...props}/>)} />
									<Route path='/credentials-manager' component={CredentialsManager} />
									<Route path='/power-scheduler' component={PowerScheduler} />
									<Route
										exact path='/reporting'
										render={(props: RouteComponentProps) => <Reporting {...props} reportingRoute='unselected' />}
									/>
									<Route
										exact path='/reporting/new'
										render={(props: RouteComponentProps) => <Reporting {...props} reportingRoute='new' />}
									/>
									<Route
										exact path='/reporting/:reportID'
										render={(props: RouteComponentProps) => <Reporting {...props} reportingRoute='saved' />}
									/>
									<Route path='/settings' component={Settings} />
									<Route path='/staff/:staffID' render={(props: RouteComponentProps) => (
										<StaffProfile {...props}/>
									)}/>
									<Route path='/staff' component={Staff} />
									<Route path='/students/:studentID' render={(props: RouteComponentProps) => (
										<StudentProfile {...props} />
									)}/>
									<Route path='/students' component={Students} />
									<Route
										exact path='/wiki'
										render={(props: RouteComponentProps) => <Wiki {...props} wikiRoute='none' />}
									/>
									<Route
										exact path='/wiki/:groupId'
										render={(props: RouteComponentProps) => <Wiki {...props} wikiRoute='group' />}
									/>
									<Route
										exact path='/wiki/post/:postId'
										render={(props: RouteComponentProps) => <Wiki {...props} wikiRoute='post' />}
									/>
									<Route component={NotFound} />
								</Switch>
							</>
						) : (
							<Switch>
								<Route path='/profile' render={(props: RouteComponentProps) => (
									<StudentProfile {...props} onSignOut={this.props.onSignOut} />
								)} />
								<Route render={() => (
									<Redirect to='/profile' />
								)} />
							</Switch>
						)}
					</div>
					<Snackbar />
				</Router>
			</>
		)
	}
}
