import * as React from 'react'
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
	Tooltip,
} from '@material-ui/core'

import { isEmpty, makeArray } from '../utils/utils'
import { StarredItem } from '../reducers/starReducer'
import { IUser } from '../types/auth'
import { IStudent } from '../types/student'
import {
	IAppointment,
	ICalendarDay,
	ICalendarBlock,
	IBlockDetails,
	ICalendarDialogGroup,
	ILedgerEntry,
	ITopicSchedule,
	ICalendarBlockVariant,
} from '../types/calendar'
import { CancelAppointment } from './Calendar/CancelAppointment'
import { Calendar } from './Calendar/Calendar'
import { TopNav } from './TopNav'
import { StarButton } from './StarButton'
import TopicsDialog from './Modals/TopicsDialog'
import { deleteAppointment } from '../actions/studentScheduleActions'
import { starItem, unstarItem } from '../actions/starActions'
import { fetchStaffProfile } from '../actions/staffProfileActions'
import { fetchStaffSchedule } from '../actions/staffScheduleActions'

interface IReduxProps {
	staff: any
	schedule: any
	newStarred: StarredItem
	fetchStaffProfile: (staffID: number) => any
	starItem: (item: StarredItem) => any
	unstarItem: (item: StarredItem) => any
	fetchStaffSchedule: (staffID: number, dateTime?: string) => any
}

interface IProps extends RouteComponentProps, IReduxProps {
	actor: IUser
}

interface IState {
	loadingProfile: boolean
	loadingSchedule: boolean
	editDialogOpen: boolean
	calendarDialogOpen: boolean
	staffID: number
	menuRef: any
	blockDetails: IBlockDetails
	cancelAppointmentDialogOpen: boolean
	cancelAppointmentDialogItem: any
	cancelAppointment: IAppointment
	topicsDialogOpen: boolean
	topcisDialogMode: 'edit' | 'select'
}

class StaffProfile extends React.Component<IProps, IState> {
	state: IState = {
		loadingProfile: false,
		loadingSchedule: false,
		editDialogOpen: false,
		calendarDialogOpen: false,
		staffID: 0,
		menuRef: null,
		blockDetails: null,
		cancelAppointmentDialogOpen: false,
		cancelAppointmentDialogItem: null,
		cancelAppointment: null,
		topicsDialogOpen: false,
		topcisDialogMode: 'edit'
	}

	toggleStarred = (isStarred: boolean) => {
		const starredItem: StarredItem = {
			item_id: this.props.staff.id,
			item_type: 'staff'
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
		return deleteAppointment(appointmentID)
			.then((res: any) => {
				return this.props.fetchStaffSchedule(this.state.staffID, this.getURLDateTime())
			})
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
		this.props.fetchStaffSchedule(this.state.staffID, dateTime || this.getURLDateTime()).then(
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

	handleTopicsDialogOpen = (mode: 'edit' | 'select') => {
		this.setState({
			topicsDialogOpen: true,
			topcisDialogMode: mode
		})
	}

	handleTopicsDialogClose = () => {
		this.setState({ topicsDialogOpen: false })
	}

	handleChangeTopic = () => {
		this.setState({
			topicsDialogOpen: true,
			topcisDialogMode: 'select'
		})
	}

	handleRemoveTopic = () => {
		
	}

	componentWillMount() {
		const params: any = this.props.match.params
		const { staffID } = params
		this.setState({ staffID })
	}

	componentDidMount() {
		this.fetchSchedule()
		this.setState({ loadingProfile: true })
		this.props.fetchStaffSchedule(this.state.staffID).then(
			(res: any) => {
				this.setState({ loadingSchedule: false })
			}
		)
		this.props.fetchStaffProfile(this.state.staffID).then(
			(res: any) => {
				this.setState({ loadingProfile: false })
			}
		)
	}

	render () {
		console.log(this.props.schedule)
		const starred: boolean = this.props.newStarred && this.props.newStarred.item_id === this.props.staff.id && this.props.newStarred.item_type === 'staff' ? (
			this.props.newStarred.isStarred !== false
		) : this.props.staff.starred

		const avatarColor = this.props.staff.color || 'red'

		const { menuRef, editDialogOpen } = this.state
		const menuOpen: boolean = Boolean(this.state.menuRef) 

		let calendar: ICalendarDay[] = null
		if (this.props.schedule && !isEmpty(this.props.schedule)) {
			calendar = this.props.schedule.schedule.map((scheduleDay: any) => {
				const calendarDay: ICalendarDay = {
					date: scheduleDay.date,
					events: scheduleDay.events,
					blocks: scheduleDay.blocks.map((block: any) => {
						const title: string = block.flex ? (
							block.scheduled ? block.scheduled.topic.memo : 'No Schedule'
						) : block.scheduled.name
						const appointments: IAppointment[] = makeArray(block.appointments)
						const ledgerEntries: ILedgerEntry[] = makeArray(block.logs)
						const topic: ITopicSchedule[] = block.flex && block.scheduled ? makeArray(block.scheduled) : undefined
						const missedAppointment: boolean = !block.pending && appointments.some((appointment: IAppointment) => {
							return ledgerEntries.every((ledgerEntry: ILedgerEntry) => {
								return appointment.staff.id !== ledgerEntry.staff.id
							})
						})
						const variant: ICalendarBlockVariant = missedAppointment ? 'missed' : (
							block.flex && block.scheduled ? block.scheduled.topic.color : 'pending'
						)
						const data: any = {
							appointments,
							ledgerEntries,
							topic
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
					title: log.student.name,
					variant: 'success',
					method: log.method
				}),
				emptyState: (
					<p className='empty_text'>No attendance recorded</p>
				)
			},
			{
				name: 'Appointments',
				key: 'appointments',
				itemMap: (appointment: IAppointment, blockDetails: IBlockDetails) => ({
					id: appointment.id,
					title: appointment.student.name,
					memo: appointment.memo,
					variant: blockDetails.pending ? 'pending' : (
						blockDetails.data.ledgerEntries
						&& blockDetails.data.ledgerEntries.some(((log: any) => (
							log.staff.id === appointment.staff.id
						))) ? 'success' : 'fail'
					)
				}),
				emptyState: (
					<p className='empty_text'>No appointments booked</p>
				),
				actions: (appointment: IAppointment, blockDetails: IBlockDetails) => {
					return !isEmpty(appointment)
					&& this.props.actor.account_type === 'staff'
					&& (this.props.actor.details.administrator === true || this.props.actor.details.id === appointment.staff.id)
					&& blockDetails.pending ?
					[
						{ value: 'Cancel Appointment', callback: () => this.handleCancelAppointmentDialogOpen(appointment) }
					] : undefined
				}
			},
			{
				name: 'Topic',
				key: 'topic',
				emptyState: (
					<>
						<p className='empty_text'>Nothing scheduled</p>
						<Button variant='text' color='primary'>Set Topic</Button>
					</>
				),
				itemMap: (topicSchedule: ITopicSchedule, blockDetails: IBlockDetails) => ({
					id: topicSchedule.id,
					title: topicSchedule.topic.memo,
					variant: topicSchedule.topic.color
				}),
				actions: (topicSchedule: ITopicSchedule, blockDetails: IBlockDetails) => {
					return !isEmpty(topicSchedule)
					&& blockDetails.flex
					&& blockDetails.pending
					&& this.props.actor.account_type === 'staff'
					&& topicSchedule.topic.staff.id === this.props.actor.details.id ?					
					[
						{ value: 'Change Topic', callback: () => this.handleChangeTopic() },
						{ value: 'Remove Topic', callback: () => this.handleRemoveTopic() },
					] : undefined
				}
			},
			{
				name: 'Scheduled',
				key: 'planned',
				emptyState: (
					<p className='empty_text'>No students scheduled</p>
				),
				children: (student: IStudent) => ([
					<h3>{student.name}</h3>
				])
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
				<TopicsDialog
					open={this.state.topicsDialogOpen}
					onClose={this.handleTopicsDialogClose}
					mode={this.state.topcisDialogMode}	
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
										<Avatar style={{background: `#${avatarColor}`}} className='profile_avatar'>{this.props.staff.initials}</Avatar>
										<div>
											<h3 className='name'>
												{this.props.staff.name}
												{this.props.staff.administrator && (
													<span className='grade'>Administrator</span>
												)}
											</h3>
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
									<Tooltip title='Topics'>
										<IconButton onClick={() => this.handleTopicsDialogOpen('edit')}>
											<Icon>school</Icon>
										</IconButton>
									</Tooltip>
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
										<MenuItem onClick={() => this.handleOpenEditDialog()}>Edit Staff</MenuItem>
									</Menu>
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
	staff: state.staffProfile.staff,
	schedule: state.staffSchedule.schedule,
	newStarred: state.starred.item
})

const mapDispatchToProps = {
	fetchStaffProfile,
	fetchStaffSchedule,
	starItem,
	unstarItem
}

export default connect(mapStateToProps, mapDispatchToProps)(StaffProfile)
