import * as React from 'react'

import ContentLoader from 'react-content-loader'
import * as classNames from 'classnames'
import { RouteComponentProps } from 'react-router-dom'
import { connect } from 'react-redux'

import {
	Avatar,
	Icon,
	IconButton
} from '@material-ui/core'

import { fetchStudentProfile } from '../../actions/studentProfileActions'

import { TopNav } from '../TopNav'
import { ITabs } from '../../types/app';
import { Schedule } from '../Schedule'

interface IReduxProps {
	student: any
	fetchStudentProfile: (studentID: number) => any
}

interface IProps extends RouteComponentProps, IReduxProps {}

interface IState {
	tab: NavTab
	loading: boolean
}

type NavTab = 'attendance' | 'schedule' | 'appointments'

class Student extends React.Component<IProps, IState> {
	state: IState = {
		tab: 'schedule',
		loading: false
	}

	handleTabChange = (event: any, value: any) => {
		this.setState({ tab: value })
	}

	componentDidMount() {
		const params: any = this.props.match.params
		this.setState({ loading: true })
		this.props.fetchStudentProfile(params.studentID).then(
			(res: any) => {
				this.setState({ loading: false })
			}
		)
	}

	render () {
		const starred: boolean = false
		const navTabs: ITabs = {
			value: this.state.tab,
			onChange: this.handleTabChange,
			tabs: [
				{ value: 'attendance', label: 'Attendance' },
				{ value: 'schedule', label: 'Schedule' },
				{ value: 'appointments', label: 'Appointments' }
			]
		}
		return (
			<div className='profile'>
				<TopNav className='--tabs' tabs={navTabs}>
					<ul>
						<li className='profile_title'>
							{this.state.loading ? (
								<div style={{height: 64, width: 250}}>
									<ContentLoader height={64} width={250}>
										<rect x={0} y={8} rx={24} ry={24} height={48} width={48}/>
										<rect x={64} y={16} rx={4} ry={4} height={32} width={164}/>
									</ContentLoader>
								</div>
							) : (
								<>
									<Avatar className='profile_avatar'>{this.props.student.initials}</Avatar>
									<h3>{`${this.props.student.first_name} ${this.props.student.last_name}`}</h3>
								</>
							)}	
						</li>
					</ul>
					<ul className='right_col'>
						<li>
							<IconButton>
								<Icon className={classNames({'--starred': starred})}>{starred ? 'star' : 'star_border'}</Icon>
							</IconButton>
						</li>
						<li>
							<IconButton>
								<Icon>more_vert</Icon>
							</IconButton>
						</li>
					</ul>
				</TopNav>
				<Schedule />
			</div>
		)
	}
}

const mapStateToProps = (state: any) => ({
	student: state.studentProfile.student
})

export default connect(mapStateToProps, { fetchStudentProfile })(Student)