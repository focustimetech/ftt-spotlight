import * as React from 'react'

import ContentLoader from 'react-content-loader'
import SwipeableViews from 'react-swipeable-views'
import * as classNames from 'classnames'
import { RouteComponentProps } from 'react-router-dom'
import { connect } from 'react-redux'

import {
	Avatar,
	Card,
	CardActionArea,
	Icon,
	IconButton
} from '@material-ui/core'

import { fetchStudentProfile } from '../actions/studentProfileActions'
import { listToTruncatedString } from '../utils/utils'

import { Tabs, TopNav } from './TopNav'
import Schedule from './Schedule'
import { Attendance } from './Attendance'

interface IReduxProps {
	student: any
	fetchStudentProfile: (studentID: number) => any
}

interface IProps extends RouteComponentProps, IReduxProps {}

interface IState {
	tab: number
	loading: boolean
	studentID: number
}

class StudentProfile extends React.Component<IProps, IState> {
	state: IState = {
		tab: 1,
		loading: false,
		studentID: -1
	}

	handleTabChange = (event: any, value: any) => {
		this.setState({ tab: value })
	}

	componentWillMount() {
		const params: any = this.props.match.params
		const { studentID } = params
		this.setState({ studentID })
	}
	componentDidMount() {
		
		this.setState({ loading: true })
		this.props.fetchStudentProfile(this.state.studentID).then(
			(res: any) => {
				this.setState({ loading: false })
			}
		)
	}

	render () {
		const starred: boolean = false
		const navTabs: Tabs = {
			value: this.state.tab,
			onChange: this.handleTabChange,
			tabs: ['Attendance', 'Schedule']
		}
		const avatarColor = this.props.student.color || 'red'

		return (
			<div className='profile'>
				<TopNav className='--tabs' tabs={navTabs}>
					<ul>
						<li className='profile_title'>
							{this.state.loading ? (
								<div style={{height: 56, width: 368}}>
									<ContentLoader height={56} width={368}>
										<rect x={0} y={4} rx={24} ry={24} height={48} width={48}/>
										<rect x={64} y={8} rx={4} ry={4} height={24} width={164}/>
										<rect x={240} y={8} rx={4} ry={4} height={24} width={128}/>
										<rect x={64} y={40} rx={4} ry={4} height={12} width={84}/>
									</ContentLoader>
								</div>
							) : (
								<>
									<Avatar style={{background: `#${avatarColor}`}} className='profile_avatar'>{this.props.student.initials}</Avatar>
									<div>
										<h3 className='name'>
											{`${this.props.student.first_name} ${this.props.student.last_name}`}
											<span className='grade'>{`Grade ${this.props.student.grade}`}</span>
										</h3>
										<a onClick={() => console.log('clicked cluster')}>
											<h5 className='cluster-list'>{this.props.student.clusters && (
												listToTruncatedString(this.props.student.clusters.map((cluster: any) => cluster.name), 'Cluster')
											)}</h5>
										</a>
									</div>
								</>
							)}	
						</li>
					</ul>
					{this.state.loading ? (
						<div style={{height: 56, width: 80}}>
							<ContentLoader height={56} width={80}>
								<rect x={0} y={12} rx={24} ry={24} height={36} width={36}/>
								<rect x={44} y={12} rx={24} ry={24} height={36} width={36}/>
							</ContentLoader>
						</div>
					) : (
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
					)}
				</TopNav>
				<SwipeableViews index={this.state.tab}>
					<Attendance />
					<Schedule studentID={this.state.studentID} />
				</SwipeableViews>
			</div>
		)
	}
}

const mapStateToProps = (state: any) => ({
	student: state.studentProfile.student
})

export default connect(mapStateToProps, { fetchStudentProfile })(StudentProfile)