import * as React from 'react'
import * as classNames from 'classnames'
import ContentLoader from 'react-content-loader'
import { RouteComponentProps } from 'react-router-dom'
import { connect } from 'react-redux'

import {
	Avatar,
	Button,
	Icon,
	IconButton,
	Menu,
	MenuItem,
	TextField
} from '@material-ui/core'

import { isEmpty, makeArray } from '../utils/utils'
import { StarredItem } from '../reducers/starReducer'
import { listToTruncatedString } from '../utils/utils'
import { StudentInfoDialog } from './Modals/StudentInfoDialog'
import { Calendar } from './Calendar/Calendar'
import { NewAppointment } from './Calendar/NewAppointment'
import { CancelAppointment } from './Calendar/CancelAppointment'
import { TopNav } from './TopNav'
import { StarButton } from './StarButton'
import { IUser } from '../types/auth'
import { IStudent } from '../types/student';
import {
	IAppointment,
	ICalendarDay,
	ICalendarBlock,
	IBlockDetails,
	ICalendarDialogGroup,
	ILedgerEntry,
	IScheduled,
	ICalendarBlockVariant
} from '../types/calendar'
import { starItem, unstarItem } from '../actions/starActions'
import { fetchStudentProfile } from '../actions/studentProfileActions'
import {
	IAppointmentRequest,
	createAppointment,
	deleteAppointment,
	fetchStudentSchedule
} from '../actions/studentScheduleActions'

interface IReduxProps {
	currentUser: IUser
	student: any
	schedule: any
	newStarred: StarredItem
	fetchStudentProfile: (studentID: number) => any
	starItem: (item: StarredItem) => any
	unstarItem: (item: StarredItem) => any
	fetchStudentSchedule: (studentID: number, dateTime?: string) => any
}

interface IProps extends RouteComponentProps, IReduxProps {}

interface IState {
	loadingProfile: boolean
	loadingSchedule: boolean
	editDialogOpen: boolean
	calendarDialogOpen: boolean
	studentID: number
	menuRef: any
	blockDetails: IBlockDetails
	cancelAppointmentDialogOpen: boolean
	cancelAppointmentDialogItem: any
	cancelAppointment: IAppointment
}

class StudentProfile extends React.Component<IProps, IState> {
	state: IState = {
		loadingProfile: false,
		loadingSchedule: false,
		editDialogOpen: false,
		calendarDialogOpen: false,
		studentID: -1,
		menuRef: null,
		blockDetails: null,
		cancelAppointmentDialogOpen: false,
		cancelAppointmentDialogItem: null,
		cancelAppointment: null
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

	getURLDateTime = (): string => {
		const searchParams = new URLSearchParams(this.props.location.search)
		return searchParams.get('date')
	}

	setURLDateTime = (dateTime: string) => {
		this.props.history.push({
			pathname: this.props.location.pathname,
			search: `?date=${dateTime}`
		})
	}

	fetchSchedule = (dateTime?: string) => {
		this.setState({ loadingSchedule: true })
		if (!this.props.currentUser)
			return
		const studentID: number = this.isOwnProfile() ? undefined : this.state.studentID
		this.props.fetchStudentSchedule(studentID, dateTime || this.getURLDateTime()).then(
			(res: any) => {
				this.setState({ loadingSchedule: false })
			}
		)
	}

	handlePrevious = () => {
		if (this.props.schedule.previous) {
			this.fetchSchedule(this.props.schedule.previous)
			this.setURLDateTime(this.props.schedule.previous)
		}
	}

	handleNext = () => {
		if (this.props.schedule.next) {
			this.fetchSchedule(this.props.schedule.next)
			this.setURLDateTime(this.props.schedule.next)
		}
	}

	handleDatePickerChange = (date: Date) => {
		this.fetchSchedule(date.toISOString())
		this.setURLDateTime(date.toISOString())
	}

	handleBlockClick = (blockDetails: IBlockDetails) => {
		this.setState({ blockDetails })
	}

	handleCalendarDialogOpen = () => {
		this.setState({ calendarDialogOpen: true })
	}

	handleCalendarDialogClose = () => {
		this.setState({ calendarDialogOpen: false })
	}

	handleCancelAppointmentDialogOpen = (appointment: IAppointment) => {
		this.setState({
			cancelAppointmentDialogOpen: true,
			cancelAppointment: appointment
		})
	}

	handleCancelAppointmentDialogClose = () => {
		this.setState({
			cancelAppointmentDialogOpen: false,
			calendarDialogOpen: false
		})
	}

	handleCancelAppointment = (appointment: IAppointment): Promise<any> => {
		const appointmentID: number = appointment.id
		const studentID: number = this.isOwnProfile() ? undefined : this.state.studentID
		return deleteAppointment(appointmentID)
			.then((res: any) => {
				return this.props.fetchStudentSchedule(studentID, this.getURLDateTime())
			})
	}

	handleCreateAppointment = (memo: string): Promise<any> => {
		const studentID: number = this.isOwnProfile() ? undefined : this.state.studentID
		const appointment: IAppointmentRequest = {
			student_id: studentID,
			memo,
			block_id: this.state.blockDetails.block_id,
			date: this.state.blockDetails.date
		}
		return createAppointment(appointment)
			.then((res: any) => {
				return this.props.fetchStudentSchedule(studentID, this.getURLDateTime())
			})
	}

	componentWillMount() {
		const params: any = this.props.match.params
		const { studentID } = params
		this.setState({ studentID })
	}

	componentDidMount() {
		const studentID: number = this.isOwnProfile() ? undefined : this.state.studentID
		this.fetchSchedule()
		this.setState({ loadingProfile: true })
		this.props.fetchStudentSchedule(studentID).then(
			(res: any) => {
				this.setState({ loadingSchedule: false })
			}
		)
		this.props.fetchStudentProfile(studentID).then(
			(res: any) => {
				this.setState({ loadingProfile: false })
			}
		)
	}

	getStudentID = (): number => {
		return this.props.currentUser.account_type === 'student'
			? this.props.currentUser.details.id
			: this.state.studentID
	}

	isOwnProfile = (): boolean => {
		return this.props.currentUser
			&& this.props.currentUser.account_type === 'student'
	}

	render () {
		const starred: boolean = this.props.newStarred && this.props.newStarred.item_id === this.props.student.id && this.props.newStarred.item_type === 'student' ? (
			this.props.newStarred.isStarred !== false
		) : this.props.student.starred

		const avatarColor = this.props.student.color || 'red'

		const { menuRef, editDialogOpen } = this.state
		const menuOpen: boolean = Boolean(this.state.menuRef)
		const studentDetails: IStudent = {
			id: this.props.student.id,
			first_name: this.props.student.first_name,
			last_name: this.props.student.last_name,
			grade: this.props.student.grade,
			student_number: this.props.student.student_number,
			initials: this.props.student.initials,
			color: this.props.student.color
		}

		let calendar: ICalendarDay[] = null
		if (this.props.schedule && !isEmpty(this.props.schedule)) {
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
						const variant: ICalendarBlockVariant = block.logs[0] ? 'attended' : (
							block.pending ? 'pending' : 'missed'
						)
						const data: any = {
							appointments: makeArray(block.appointments),
							ledgerEntries: makeArray(block.logs),
							scheduled: makeArray(block.scheduled)
						}
						const details: IBlockDetails = {
							block_id: block.id,
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
							memo: block.logs[0] && block.flex && block.logs[0].topic ? block.logs[0].topic.memo : null,
							details
						}
						return calendarBlock
					})
				}
				return calendarDay
			})
		}

		const calendarDialogGroups: ICalendarDialogGroup[] = [
			{
				name: 'Logs',
				key: 'ledgerEntries',
				itemMap: (log: ILedgerEntry) => ({
					id: log.id,
					time: log.time,
					title: log.staff.name,
					memo: log.topic ? log.topic.memo : 'No Topic',
					variant: 'success',
					method: log.method
				}),
				emptyState: () => (
					<p className='empty_text'>No attendance recorded</p>
				)
			},
			{
				name: 'Appointments',
				key: 'appointments',
				itemMap: (appointment: IAppointment, blockDetails: IBlockDetails) => ({
					id: appointment.id,
					title: appointment.staff.name,
					memo: appointment.memo,
					variant: blockDetails.pending ? 'pending' : (
						blockDetails.data.ledgerEntries
						&& blockDetails.data.ledgerEntries.some(((log: any) => (
							log.staff.id === appointment.staff.id
						))) ? 'success' : 'fail'
					)
				}),
				emptyState: () => (
					<p className='empty_text'>No appointments booked</p>
				),
				child: (blockDetails: IBlockDetails) => {
					return blockDetails.pending ? (
						<NewAppointment
							onSubmit={this.handleCreateAppointment}
							onClose={this.handleCalendarDialogClose}
						/>
					) : undefined
				},
				actions: (appointment: IAppointment, blockDetails: IBlockDetails) => {
					return !isEmpty(appointment)
					&& this.props.currentUser.account_type === 'staff'
					&& (this.props.currentUser.details.administrator === true || this.props.currentUser.details.id === appointment.staff.id)
					&& blockDetails.pending ?
					[
						{ value: 'Cancel Appointment', callback: () => Promise.resolve(this.handleCancelAppointmentDialogOpen(appointment)) }
					] : undefined
				}
			},
			{
				name: 'Scheduled',
				key: 'scheduled',
				itemMap: (scheduledItem: IScheduled, blockDetails: IBlockDetails) => ({
					title: scheduledItem.name,
					variant: blockDetails.pending ? null : (
						blockDetails.flex === true ? (
							blockDetails.data.ledgerEntries
							&& blockDetails.data.ledgerEntries.some(((log: any) => (
								log.staff.id === scheduledItem.id))
							) ? 'success' : 'fail'
						) : (
							blockDetails.data && blockDetails.data.ledgerEntries
							&& blockDetails.data.ledgerEntries.length > 0 ? 'success' : 'fail'
						)
					),
					memo: scheduledItem.topic ? scheduledItem.topic.memo : undefined
				}),
				emptyState: () => (
					<p className='empty_text'>Nothing scheduled</p>
				)
			}
		]

		return (
			<div className='content' id='content'>
				<CancelAppointment
					open={this.state.cancelAppointmentDialogOpen}
					appointment={this.state.cancelAppointment}
					onClose={this.handleCancelAppointmentDialogClose}
					onSubmit={this.handleCancelAppointment}
				/>
				<StudentInfoDialog
					open={editDialogOpen}
					onClose={this.handleCloseEditDialog}
					onSubmit={() => {}}
					edit={true}
					studentDetails={studentDetails}
				/>
				<div className='profile'>
					<TopNav>
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
										<Avatar className={classNames('profile_avatar', `--${avatarColor}`)}>{this.props.student.initials}</Avatar>
										<div>
											<h3 className='name'>
												{`${this.props.student.first_name} ${this.props.student.last_name}`}
												<span className='grade'>{`Grade ${this.props.student.grade}`}</span>
											</h3>
											<a onClick={() => null}>
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
							</ul>
						)}
					</TopNav>
					<Calendar
						hasNext={Boolean(this.props.schedule.next)}
						hasPrevious={Boolean(this.props.schedule.previous)}
						loading={this.state.loadingSchedule || !calendar}
						rangeLabel={this.props.schedule.range}
						minDate={this.props.schedule.min_date}
						maxDate={this.props.schedule.max_date}
						calendar={calendar}
						calendarDialogGroups={calendarDialogGroups}
						onNext={this.handleNext}
						onPrevious={this.handlePrevious}
						onDatePickerChange={this.handleDatePickerChange}
						onBlockClick={this.handleBlockClick}
						dialogOpen={this.state.calendarDialogOpen}
						onDialogOpen={this.handleCalendarDialogOpen}
						onDialogClose={this.handleCalendarDialogClose}
					/>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state: any) => ({
	currentUser: state.auth.user,
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
