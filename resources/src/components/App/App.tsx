import '../../assets/styles/main.scss'

import * as React from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'
import {
	BrowserRouter as Router,
	Redirect,
	Route,
	RouteComponentProps,
	Switch
} from 'react-router-dom'

import { IUser } from '../../types/auth'
import CheckIn from '../CheckIn/CheckIn'
import CredentialsManager from '../Views/CredentialsManager'
import { NotFound } from '../Views/NotFound'
import Reporting from '../Reporting/Reporting'
import Settings from '../Views/Settings'
import Snackbar from '../Snackbar'
import StudentProfile from '../Views/StudentProfile'
import Students from '../Views/Students'
import Sidebar from '../Sidebar/Sidebar'
import Staff from '../Views/Staff'
import StaffProfile from '../Views/StaffProfile'
import PowerScheduler from '../Views/PowerScheduler'

interface IProps {
	currentUser: IUser
	settings: any
	onSignOut: () => void
	didMount: () => void
}

export default class App extends React.Component<IProps> {
	componentDidMount() {
		this.props.didMount()
	}

	render() {
		return (
			<>
				<Router>
					<div className={classNames('site-wrap', '--menu_open')}>
						{
							this.props.currentUser.account_type === 'staff' ? <>
								<Sidebar
									onSignOut={this.props.onSignOut}
									schoolName={this.props.settings.values['school_name'].value || undefined}
									schoolLogo={this.props.settings.values['school_logo'].value || undefined}
								/>
								<Switch>
									<Route path='/' exact render={() => (
										<Redirect to='/check-in' />
									)} />
									<Route path='/check-in' render={(props: RouteComponentProps) => (<CheckIn {...props} />)} />
									<Route path='/credentials-manager' component={CredentialsManager} />
									<Route path='/power-scheduler' component={PowerScheduler} />
									<Route path='/reporting' render={(props: RouteComponentProps) => <Reporting {...props} />} />
									<Route path='/settings' component={Settings} />
									<Route path='/staff/:staffID' render={(props: RouteComponentProps) => (
										<StaffProfile {...props}/>
									)}/>
									<Route path='/staff' component={Staff} />
									<Route path='/students/:studentID' render={(props: RouteComponentProps) => (
										<StudentProfile {...props} />
									)}/>
									<Route path='/students' component={Students} />
									<Route component={NotFound} />
								</Switch>
							</> : <>
								<Switch>
									<Route path='/profile' render={(props: RouteComponentProps) => (
										<StudentProfile {...props} onSignOut={this.props.onSignOut} />
									)} />
									<Route render={() => (
										<Redirect to='/profile' />
									)} />
								</Switch>
							</>
						}
					</div>
					<Snackbar />
				</Router>
			</>
		)
	}
}
