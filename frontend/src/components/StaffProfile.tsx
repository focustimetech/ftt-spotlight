import * as React from 'react'
import ContentLoader from 'react-content-loader'
import { RouteComponentProps } from 'react-router-dom'
import { connect } from 'react-redux'

import {
	Avatar,
	Icon,
	IconButton,
	Menu,
	MenuItem,
} from '@material-ui/core'

import { isEmpty, makeArray } from '../utils/utils'
import { StarredItem } from '../reducers/starReducer'
import { listToTruncatedString } from '../utils/utils'
import { CancelAppointment } from './Calendar/CancelAppointment'
import { Calendar } from './Calendar/Calendar'
import { TopNav } from './TopNav'
import { StarButton } from './StarButton'
import { IUser } from '../types/auth'
import { IStaff } from '../types/staff';
import {
	IAppointment,
	ICalendarDay,
	ICalendarBlock,
	IBlockDetails,
	ICalendarDialogGroup,
	ILedgerEntry,
	IScheduled
} from '../types/calendar'
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
		cancelAppointment: null
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
						/*
						const title: string = block.flex ? (
							block.logs[0] ? (
								block.logs[0].staff.name 
							) : (
								block.scheduled ? block.scheduled.name : 'No Schedule'
							)
						) : (
							block.scheduled.name
						)
						*/
						const title: string = 'is a block.'
						const variant: string = block.logs[0] ? 'attended' : (
							block.pending ? 'pending' : 'missed'
						)
						const data: any = {
							appointments: makeArray(block.appointments),
							ledgerEntries: makeArray(block.logs),
							// scheduled: makeArray(block.scheduled)
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
							memo: block.logs[0] && block.flex? block.logs[0].topic.topic || null : null,
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
					return!isEmpty(appointment)
					&& this.props.actor.account_type === 'staff'
					&& (this.props.actor.details.administrator === true || this.props.actor.details.id === appointment.staff.id)
					&& blockDetails.pending ?
					[
						{ value: 'Cancel Appointment', callback: () => this.handleCancelAppointmentDialogOpen(appointment) }
					] : undefined
				}
			},
			/*
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
					memo: scheduledItem.topic ? scheduledItem.topic.topic : undefined
				}),
				emptyState: (
					<p className='empty_text'>Nothing scheduled</p>
				)
			}
			*/
		]

		return (
			<div className='content' id='content'>
				<CancelAppointment
					open={this.state.cancelAppointmentDialogOpen}
					appointment={this.state.cancelAppointment}
					onClose={this.handleCancelAppointmentDialogClose}
					onSubmit={this.handleCancelAppointment}
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
												{`${this.props.staff.first_name} ${this.props.staff.last_name}`}
												<span className='grade'>{`Grade ${this.props.staff.grade}`}</span>
											</h3>
											<a onClick={() => null}>
												<h5 className='cluster-list'>{this.props.staff.clusters && (
													listToTruncatedString(this.props.staff.clusters.map((cluster: any) => cluster.name), 'Cluster')
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
