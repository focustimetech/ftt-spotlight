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

import { isEmpty, makeArray } from '../utils/utils'
import { StarredItem } from '../reducers/starReducer'
import { listToTruncatedString } from '../utils/utils'
import { StudentInfoDialog } from './Modals/StudentInfoDialog'
import { Attendance } from './Attendance'
import { Calendar } from './Calendar/Calendar'
import { Tabs, TopNav } from './TopNav'
import { StarButton } from './StarButton'
import { IStudent } from '../types/student';
import { ICalendarDay, ICalendarBlock, ICalendarItemData, IBlockDetails } from '../types/calendar'
import { starItem, unstarItem } from '../actions/starActions'
import { fetchStudentProfile } from '../actions/studentProfileActions'
import { fetchStudentSchedule } from '../actions/studentScheduleActions'

interface IReduxProps {
	student: any
	schedule: any
	newStarred: StarredItem
	fetchStudentProfile: (studentID: number) => any
	starItem: (item: StarredItem) => any
	unstarItem: (item: StarredItem) => any
	fetchStudentSchedule: (studentID: number, dateTime?: string) => any
}

interface IProps extends RouteComponentProps, IReduxProps {
	editable: boolean
}

interface IState {
	tab: number
	loadingProfile: boolean
	loadingSchedule: boolean
	editDialogOpen: boolean
	studentID: number
	menuRef: any
}

class StudentProfile extends React.Component<IProps, IState> {
	state: IState = {
		tab: 1,
		loadingProfile: false,
		loadingSchedule: false,
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

	fetchSchedule = (dateTime?: string) => {
		this.setState({ loadingSchedule: true })
		this.props.fetchStudentSchedule(this.state.studentID, dateTime).then(
			(res: any) => {
				this.setState({ loadingSchedule: false })
			}
		)
	}

	handlePrevious = () => {
		if (this.props.schedule.previous) {
			this.fetchSchedule(this.props.schedule.previous)
		}
	}

	handleNext = () => {
		if (this.props.schedule.next) {
			this.fetchSchedule(this.props.schedule.next)
		}
	}

	componentWillMount() {
		const params: any = this.props.match.params
		const { studentID } = params
		this.setState({ studentID })
	}

	componentDidMount() {
		this.fetchSchedule()
		this.setState({ loadingProfile: true })
		this.props.fetchStudentSchedule(this.state.studentID).then(
			(res: any) => {
				this.setState({ loadingSchedule: false })
			}
		)
		this.props.fetchStudentProfile(this.state.studentID).then(
			(res: any) => {
				this.setState({ loadingProfile: false })
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

		let calendar: ICalendarDay[] = null
		if (this.props.schedule && !isEmpty(this.props.schedule)) {
			// console.log('SCHEDULE:', this.props.schedule)
			calendar = this.props.schedule.schedule.map((scheduleDay: any) => {
				const calendarDay: ICalendarDay = {
					date: scheduleDay.date,
					events: scheduleDay.events,
					blocks: scheduleDay.blocks.map((block: any) => {
						const title: string = block.flex ? (
							block.logs[0] ? (
								block.logs[0].staff.name 
							) : (
								block.scheduled ? block.scheduled.name : 'No Schedule'
							)
						) : (
							block.scheduled.name
						)
						const variant: string = block.logs[0] ? 'attended' : (
							block.pending ? 'pending' : 'missed'
						)
						const data: ICalendarItemData = {
							appointments: makeArray(block.appointments),
							ledgerEntries: makeArray(block.logs),
							scheduled: makeArray(block.scheduled)
						}
						const details: IBlockDetails = {
							date: `${scheduleDay.date.day} ${scheduleDay.date.full_date}`,
							start: block.start,
							end: block.end,
							flex: block.flex,
							label: block.label,
							pending: block.pending,
							data
						}
						const calendarBlock: ICalendarBlock = {
							title,
							variant,
							badgeCount: block.appointments.length || 0,
							memo: block.logs[0] && block.flex? block.logs[0].topic.topic || null : null,
							details
						}
						return calendarBlock
					})
				}
				return calendarDay
			})
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
								{this.state.loadingProfile ? (
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
						{this.state.loadingProfile ? (
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
						<Calendar
							hasNext={Boolean(this.props.schedule.next)}
							hasPrevious={Boolean(this.props.schedule.previous)}
							loading={this.state.loadingSchedule || !calendar}
							rangeLabel={this.props.schedule.range}
							minDate={this.props.schedule.min_date}
							maxDate={this.props.schedule.max_date}
							calendar={calendar}
							onNext={this.handleNext}
							onPrevious={this.handlePrevious}
						/>
					</SwipeableViews>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state: any) => ({
	student: state.studentProfile.student,
	schedule: state.studentSchedule.schedule,
	newStarred: state.starred.item
})

const mapDispatchToProps = {
	fetchStudentProfile,
	fetchStudentSchedule,
	starItem,
	unstarItem
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentProfile)
