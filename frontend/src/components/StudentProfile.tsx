import * as React from 'react'

import ContentLoader from 'react-content-loader'
import SwipeableViews from 'react-swipeable-views'
import { RouteComponentProps } from 'react-router-dom'
import { connect } from 'react-redux'

import {
	Avatar,
	Icon,
	IconButton,
	Menu,
	MenuItem
} from '@material-ui/core'

import { StarredItem } from '../reducers/starReducer'
import { starItem, unstarItem } from '../actions/starActions'
import { fetchStudentProfile } from '../actions/studentProfileActions'
import { listToTruncatedString } from '../utils/utils'
import { StudentInfoDialog } from './Modals/StudentInfoDialog'
import { Attendance } from './Attendance'
import { Tabs, TopNav } from './TopNav'
import Schedule from './Schedule'
import { StarButton } from './StarButton'
import { IStudent } from '../types/student';

interface IReduxProps {
	student: any
	newStarred: StarredItem
	fetchStudentProfile: (studentID: number) => any
	starItem: (item: StarredItem) => any
	unstarItem: (item: StarredItem) => any
}

interface IProps extends RouteComponentProps, IReduxProps {
	
}

interface IState {
	tab: number
	loading: boolean
	editDialogOpen: boolean
	studentID: number
	menuRef: any
}

class StudentProfile extends React.Component<IProps, IState> {
	state: IState = {
		tab: 1,
		loading: false,
		editDialogOpen: false,
		studentID: -1,
		menuRef: null
	}

	handleTabChange = (event: any, value: any) => {
		this.setState({ tab: value })
	}

	toggleStarred = (isStarred: boolean) => {
		const starredItem: StarredItem = {
			item_id: this.props.student.id,
			item_type: 'student'
		}
		if (isStarred) {
            this.props.unstarItem(starredItem)
        } else {
            this.props.starItem(starredItem)
        }
	}

	handleMenuOpen = (event: any) => {
		this.setState({ menuRef: event.currentTarget })
	}

	handleMenuClose = () => {
		this.setState({ menuRef: null })
	}

	handleOpenEditDialog = () => {
		this.handleMenuClose()
		this.setState({ editDialogOpen: true })
	}

	handleCloseEditDialog = () => {
		this.setState({ editDialogOpen: false })
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
		const starred: boolean = this.props.newStarred && this.props.newStarred.item_id === this.props.student.id && this.props.newStarred.item_type === 'student' ? (
			this.props.newStarred.isStarred !== false
		) : this.props.student.starred

		const navTabs: Tabs = {
			value: this.state.tab,
			onChange: this.handleTabChange,
			tabs: ['Attendance', 'Schedule']
		}
		const avatarColor = this.props.student.color || 'red'

		const { menuRef, editDialogOpen } = this.state
		const menuOpen: boolean = Boolean(this.state.menuRef)
		const studentDetails: IStudent = {
			id: this.props.student.id,
			first_name: this.props.student.first_name,
			last_name: this.props.student.last_name,
			grade: this.props.student.grade,
			student_number: this.props.student.student_number
		}

		return (
			<div className='content' id='content'>
				<StudentInfoDialog
					open={editDialogOpen}
					onClose={this.handleCloseEditDialog}
					onSubmit={() => {}}
					edit={true}
					studentDetails={studentDetails}
				/>
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
									<StarButton onClick={() => this.toggleStarred(starred)} isStarred={starred} />
								</li>
								<li>
									<IconButton onClick={this.handleMenuOpen}>
										<Icon>more_vert</Icon>
									</IconButton>
									<Menu
										open={menuOpen}
										anchorEl={menuRef}
										onClose={this.handleMenuClose}
									>
										<MenuItem onClick={() => this.handleOpenEditDialog()}>Edit Student</MenuItem>
									</Menu>
								</li>
							</ul>
						)}
					</TopNav>
					<SwipeableViews index={this.state.tab}>
						<Attendance />
						<Schedule studentID={this.state.studentID} />
					</SwipeableViews>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state: any) => ({
	student: state.studentProfile.student,
	newStarred: state.starred.item
})

const mapDispatchToProps = {
	fetchStudentProfile,
	starItem,
	unstarItem
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentProfile)
