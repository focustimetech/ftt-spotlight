import * as React from 'react'
import classNames from 'classnames'
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

import { isEmpty, makeArray } from '../../utils/utils'
import { StarredItem } from '../../reducers/starReducer'
import { IUser } from '../../types/auth'
import { IStudent } from '../../types/student'
import { ConfirmationDialog } from '../Modals/ConfirmationDialog'
import {
	IAmendment,
	IAppointment,
	ICalendarDay,
	ICalendarBlock,
	IBlockDetails,
	ICalendarDialogGroup,
	ILedgerEntry,
	ITopic,
	ITopicSchedule,
	ISchedulePlan,
	ICalendarBlockVariant,
} from '../../types/calendar'
import { LoadingButton } from '../Form/LoadingButton'
import CapacityWidget from '../Modals/CapacityWidget'
import ChangePasswordWidget from '../Modals/ChangePasswordWidget'
import { CancelAppointment } from '../Calendar/CancelAppointment'
import { Calendar } from '../Calendar/Calendar'
import { TopNav } from '../TopNav'
import { StarButton } from '../StarButton'
import TopicsDialog from '../Modals/TopicsDialog'
import { queueSnackbar, ISnackbar } from '../../actions/snackbarActions'
import { deleteAppointment } from '../../actions/studentScheduleActions'
import { starItem, unstarItem } from '../../actions/starActions'
import { fetchStaffProfile } from '../../actions/staffProfileActions'
import { fetchStaffSchedule } from '../../actions/staffScheduleActions'
import { createTopicSchedule, deleteTopicSchedule, ITopicScheduleRequest } from '../../actions/topicActions'

interface IReduxProps {
	currentUser: IUser
	staff: any
	schedule: any
	newStarred: StarredItem
	fetchStaffProfile: (staffID: number) => any
	starItem: (item: StarredItem) => any
	unstarItem: (item: StarredItem) => any
	queueSnackbar: (snackbar: ISnackbar) => any
	fetchStaffSchedule: (staffID: number, dateTime?: string) => any
	createTopicSchedule: (topicSchedule: ITopicScheduleRequest) => Promise<any>
	deleteTopicSchedule: (topicScheduleID: number) => Promise<any>
}

interface IProps extends RouteComponentProps, IReduxProps {}

interface IState {
	loadingProfile: boolean
	loadingSchedule: boolean
	loadingSetTopic: boolean
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
	onTopicSelect: (topic: ITopic) => void
}

class StaffProfile extends React.Component<IProps, IState> {
	state: IState = {
		loadingProfile: false,
		loadingSchedule: false,
		loadingSetTopic: false,
		editDialogOpen: false,
		calendarDialogOpen: false,
		staffID: 0,
		menuRef: null,
		blockDetails: null,
		cancelAppointmentDialogOpen: false,
		cancelAppointmentDialogItem: null,
		cancelAppointment: null,
		topicsDialogOpen: false,
		topcisDialogMode: 'edit',
		onTopicSelect: () => null
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

	handleSetTopic = () => {
		this.handleTopicsDialogOpen('select')
		this.setState({ onTopicSelect: this.onTopicSet })
	}

	onTopicSet = (topic: ITopic) => {
		this.setState({ loadingSetTopic: true })
		const topicSchedule: ITopicScheduleRequest = {
			topic_id: topic.id,
			block_id: this.state.blockDetails.block_id,
			date: this.state.blockDetails.date
		}
		this.props.createTopicSchedule(topicSchedule)
			.then(res => {
				this.props.fetchStaffSchedule(this.state.staffID, this.getURLDateTime())
					.then((res: any) => {
						this.setState({
							loadingSetTopic: false,
							calendarDialogOpen: false
						})
						this.props.queueSnackbar({
							message: 'Set Topic successfully.'
						})
					})
			})
			.catch(error => {
				this.setState({ loadingSetTopic: false })
			})
	}

	onRemoveTopic = (topicSchedule: ITopicSchedule): Promise<any> => {
		return this.props.deleteTopicSchedule(topicSchedule.id)
			.then(() => {
				return this.props.fetchStaffSchedule(this.state.staffID, this.getURLDateTime())
					.then(() => {
						this.props.queueSnackbar({
							message: 'Removed Topic successfully.'
						})
					})
			})
	}

	componentWillMount() {
		const params: any = this.props.match.params
		const staffID: number = Number(params.staffID)
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
		const isOwner: boolean = this.props.currentUser.account_type === 'staff'
		&& this.state.staffID === this.props.currentUser.details.id
		const starred: boolean = this.props.newStarred && this.props.newStarred.item_id === this.props.staff.id && this.props.newStarred.item_type === 'staff' ? (
			this.props.newStarred.isStarred !== false
		) : this.props.staff.starred

		const avatarColor: string = this.props.staff.color || null

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
						const amendments: IAmendment[] = makeArray(block.amendments)
						const appointments: IAppointment[] = makeArray(block.appointments)
						const ledgerEntries: ILedgerEntry[] = makeArray(block.logs)
						const topic: ITopicSchedule[] = block.flex && block.scheduled ? makeArray(block.scheduled) : undefined
						const planned: ISchedulePlan[] = makeArray(block.planned)
						const missedAppointment: boolean = !block.pending && appointments.some((appointment: IAppointment) => {
							return ledgerEntries.every((ledgerEntry: ILedgerEntry) => {
								return appointment.staff.id !== ledgerEntry.staff.id
							})
						})
						const variant: ICalendarBlockVariant = missedAppointment ? 'missed' : (
							block.flex && block.scheduled ? block.scheduled.topic.color : 'pending'
						)
						const data: any = {
							amendments,
							appointments,
							ledgerEntries,
							topic,
							planned
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
				name: 'Amendments',
				keys: ['amendments'],
				itemMaps: [
					(amendment: IAmendment) => ({
						id: amendment.id,
						time: 'Amended',
						title: amendment.staff.name,
						memo: amendment.memo,
						method: 'amendment',
						variant: 'default'
					})
				]
			},
			{
				name: 'Logs',
				keys: ['ledgerEntries'],
				itemMaps: [
					(log: ILedgerEntry) => ({
						id: log.id,
						time: log.time,
						title: log.student.name,
						variant: 'success',
						method: log.method
					})
				],
				emptyState: () => (
					<p className='empty_text'>No attendance recorded</p>
				)
			},
			{
				name: 'Appointments',
				keys: ['appointments'],
				itemMaps: [
					(appointment: IAppointment, blockDetails: IBlockDetails) => ({
						id: appointment.id,
						title: appointment.student.name,
						memo: appointment.memo,
						variant: blockDetails.pending ? 'pending' : (
							blockDetails.data.ledgerEntries
							&& blockDetails.data.ledgerEntries.some(((log: any) => (
								log.staff.id === appointment.staff.id
							))) ? 'success' : 'fail'
						)
					})
				],
				emptyState: () => (
					<p className='empty_text'>No appointments booked</p>
				),
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
				name: 'Topic',
				keys: ['topic'],
				emptyState: (blockDetails: IBlockDetails) => (
					<>
						<p className='empty_text'>Nothing scheduled</p>
						{(blockDetails.flex && blockDetails.pending && isOwner) && (
							<LoadingButton
								loading={this.state.loadingSetTopic}
								variant='text'
								color='primary'
								onClick={() => this.handleSetTopic()}
							>Set Topic</LoadingButton>
						)}
					</>					
				),
				itemMaps: [
					(topicSchedule: ITopicSchedule, blockDetails: IBlockDetails) => ({
						id: topicSchedule.id,
						title: topicSchedule.topic.memo,
						variant: topicSchedule.topic.color,
						memo: topicSchedule.topic.unavailable ? 'Unavailable' : undefined
					})
				],
				actions: (topicSchedule: ITopicSchedule, blockDetails: IBlockDetails) => {
					return !isEmpty(topicSchedule)
					&& blockDetails.flex
					&& blockDetails.pending
					&& isOwner ?				
					[
						// { value: 'Change Topic', callback: () => Promise.resolve(this.handleTopicsDialogOpen('select')) },
						{ value: 'Remove Topic', callback: () => this.onRemoveTopic(topicSchedule), closeOnCallback: true }
					] : undefined
				}
			},
			{
				name: 'Scheduled',
				keys: ['planned'],
				emptyState: () => (
					<p className='empty_text'>No students scheduled</p>
				),
				children: (student: IStudent) => ([
					<h3>{student.name}</h3>
				]),
				itemMaps: [
					(schedulePlan: ISchedulePlan, blockDetails: IBlockDetails) => ({
						id: schedulePlan.id,
						title: schedulePlan.student.name,
						variant: blockDetails.pending ? 'pending' : (
							blockDetails.data.ledgerEntries
							&& blockDetails.data.ledgerEntries.some(((log: ILedgerEntry) => (
								log.student.id === schedulePlan.student.id
							))) ? 'success' : 'fail'
						)
					})
				],
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
					onSelect={this.state.onTopicSelect}
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
										<Avatar className={classNames('profile_avatar', `--${avatarColor}`)}>{this.props.staff.initials}</Avatar>
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
								{isOwner ? (
									<>
										<li>
											<Tooltip title='Set Capacity'>
												<CapacityWidget
													capacity={this.props.currentUser.account_type === 'staff' ? this.props.currentUser.details.capacity : -1}/>
											</Tooltip>
										</li>
										<li>
											<Tooltip title='Topics'>
												<IconButton onClick={() => this.handleTopicsDialogOpen('edit')}>
													<Icon>school</Icon>
												</IconButton>
											</Tooltip>
										</li>
										<li>
											<ChangePasswordWidget />
										</li>
									</>
								) : (
									<li>
										<StarButton onClick={() => this.toggleStarred(starred)} isStarred={starred} />
									</li>
								)}								
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
	staff: state.staffProfile.staff,
	schedule: state.staffSchedule.schedule,
	newStarred: state.starred.item,
})

const mapDispatchToProps = {
	createTopicSchedule,
	deleteTopicSchedule,
	fetchStaffProfile,
	fetchStaffSchedule,
	queueSnackbar,
	starItem,
	unstarItem
}

export default connect(mapStateToProps, mapDispatchToProps)(StaffProfile)
