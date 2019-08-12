import '../../assets/styles/main.scss'

import * as React from 'react'
import * as classNames from 'classnames'
import { connect } from 'react-redux'
import {
	BrowserRouter as Router, 
	Redirect,
	Route,
	Switch
} from 'react-router-dom'

import { getCurrentUser } from '../../actions/authActions'
import { ClassSchedule } from '../ClassSchedule'
import { Clusters } from '../Clusters'
import { Dashboard } from '../Dashboard'
import { NotFound } from '../NotFound'
import Settings from '../Settings'
import StudentProfile from '../StudentProfile'
import Students from '../Students'
import Sidebar from '../Sidebar/Sidebar'
import Staff from '../Staff'
import { Splash } from './Splash'

/**
 * @TODO Create typedefs for currentUser (see authReducer.ts)
 */
interface ReduxProps {
	getCurrentUser: () => any
	currentUser: any
}

interface IState {
	loading: boolean
}

interface IProps extends ReduxProps {
	onSignOut: () => void
}

class App extends React.Component<IProps, IState> {
	state: IState = {
		loading: true
	}

	componentDidMount() {
		this.props.getCurrentUser().then(
			() => {
				this.setState({ loading: false })
			},
			() => {
				this.props.onSignOut()
			}
		)
	}

	render() {

		/**
		 * @TODO Create transition from loading
		 */
		return this.state.loading ? (
			<Splash />
		) : (
			<>
				<Router>
					<div className={classNames('site-wrap', '--menu_open')}>
						{
							this.props.currentUser.account_type === 'staff' ? <>
								<Sidebar onSignOut={this.props.onSignOut} loading={this.state.loading} />
								<Switch>
									<Route path='/' exact render={(props) => (
										<Redirect to='/dashboard' />
									)} />
									<Route path='/clusters/:clusterID?' component={Clusters} />
									<Route exact path='/dashboard' component={Dashboard} />
									<Route path='/settings' component={Settings} />
									<Route path='/staff' component={Staff} />
									<Route path='/students/:studentID' component={StudentProfile} />
									<Route path='/students' component={Students} />
									<Route path='/class-schedule' component={ClassSchedule} />
									<Route component={NotFound} />
								</Switch>
							</> : <>
								<Route path='/' exact render={(props) => (
									<Redirect to='/profile' />
								)} />
								<Route path='/profile' component={StudentProfile} />
							</>
						}
					</div>
				</Router>
			</>
		)
	}
}

/**
 * @TODO Create app settings redux reducer and actions; Make available through props;
 * Pass `school_name` to Sidebar as prop upon loading app settings; 
 */
const mapDispatchToProps = { getCurrentUser }
const mapStateToProps = (state: any) => ({
	currentUser: state.auth.user
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
