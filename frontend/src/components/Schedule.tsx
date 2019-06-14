import * as React from 'react'

import classNames from 'classnames'
import ContentLoader from 'react-content-loader'
import { connect } from 'react-redux'
import DateFnsUtils from '@date-io/date-fns'

import {
	Button,
	Icon,
	IconButton,
	Dialog,
	TextField,
	Tooltip
} from '@material-ui/core'
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers'

import { ScheduleBlock } from './ScheduleBlock'
import { ScheduleBlockDialog } from './Modals/ScheduleBlockDialog'
import { fetchStudentSchedule } from '../actions/studentScheduleActions'
import { BlockSchedule } from './BlockSchedule';

export interface BlockDetails {
	date: string,
	start: string,
	end: string,
	scheduled: any,
	label: string,
	logs?: any[]
	appointments?: any[]
}

const emptyBlockDetails: BlockDetails = {
	date: '',
	start: '',
	end: '',
	label: '',
	scheduled: {},
	logs: [],
	appointments: []
}
interface ReduxProps {
	schedule: any
	fetchStudentSchedule: (studentID: number, dateTime?: string) => any
}

interface IProps extends ReduxProps {
	studentID: number
}

interface IState {
	loading: boolean
	datePickerOpen: boolean
	datePickerRange: Date
	dialogOpen: boolean
	blockDetails: BlockDetails
}

class Schedule extends React.Component<IProps, IState> {
	state: IState = {
		loading: false,
		datePickerOpen: false,
		datePickerRange: new Date(),
		dialogOpen: false,
		blockDetails: emptyBlockDetails
	}

	handleDatePickerOpen = () => {
		this.setState({ datePickerOpen: true })
	}

	handleDatePickerClose = () => {
		this.setState({ datePickerOpen: false })
	}

	handleDatePickerSelect = (datePickerRange: Date) => {
		this.setState({ datePickerRange })
	}

	handlePrevious = () => {
		console.log('handlePrevious()')
	}

	handleNext = () => {
		console.log('handleNext()')
	}

	handleBlockClick = (blockDetails: BlockDetails): void => {
		this.setState({ blockDetails, dialogOpen: true })
		console.log('handleBlockClick()')
	}

	handleDialogClose = () => {
		this.setState({ dialogOpen: false })
	}

	componentDidMount() {
		this.setState({ loading: true })
		this.props.fetchStudentSchedule(this.props.studentID).then(
			(res: any) => {
				this.setState({ loading: false })
				console.log(this.props.schedule)
			}
		)
	}

	render() {
		return (
			<div className='schedule_container'>
				{this.state.loading || !(this.props.schedule) ? (
					<>
						<div style={{width: 216, height: 64}}>
							<ContentLoader width={216} height={64}>
								<rect x={0} y={16} rx={4} ry={4} width={120} height={24} />
								<rect x={136} y={8} rx={36} ry={36} width={36} height={36} />
								<rect x={180} y={8} rx={36} ry={36} width={36} height={36} />
							</ContentLoader>
						</div>
						<div style={{width: '100%'}}>
							<ContentLoader width={864} height={384}>
								<rect x={62} y={0} ry={4} rx={4} width={36} height={16} />
								<rect x={62} y={28} ry={36} rx={48} width={36} height={36} />
								<rect x={0} y={80} ry={4} rx={4} width={160} height={96} />
								<rect x={0} y={184} ry={4} rx={4} width={160} height={96} />
								<rect x={0} y={288} ry={4} rx={4} width={160} height={96} />

								<rect x={238} y={0} ry={4} rx={4} width={36} height={16} />
								<rect x={238} y={28} ry={36} rx={48} width={36} height={36} />
								<rect x={176} y={80} ry={4} rx={4} width={160} height={96} />
								<rect x={176} y={184} ry={4} rx={4} width={160} height={96} />

								<rect x={414} y={0} ry={4} rx={4} width={36} height={16} />
								<rect x={414} y={28} ry={36} rx={48} width={36} height={36} />
								<rect x={352} y={80} ry={4} rx={4} width={160} height={96} />
								<rect x={352} y={184} ry={4} rx={4} width={160} height={96} />
								<rect x={352} y={288} ry={4} rx={4} width={160} height={96} />

								<rect x={590} y={0} ry={4} rx={4} width={36} height={16} />
								<rect x={590} y={28} ry={36} rx={48} width={36} height={36} />
								<rect x={528} y={80} ry={4} rx={4} width={160} height={96} />

								<rect x={766} y={0} ry={4} rx={4} width={36} height={16} />
								<rect x={766} y={28} ry={36} rx={48} width={36} height={36} />
								<rect x={704} y={80} ry={4} rx={4} width={160} height={96} />
								<rect x={704} y={184} ry={4} rx={4} width={160} height={96} />
							</ContentLoader>
						</div>
					</>
				) : (
					<>
						<ScheduleBlockDialog
							details={this.state.blockDetails}
							open={this.state.dialogOpen}
							onClose={this.handleDialogClose}
						/>
						<ul className='schedule_header'>
							<li>
								<MuiPickersUtilsProvider utils={DateFnsUtils}>
									<DatePicker
										variant='dialog'
										open={this.state.datePickerOpen}
										onClose={() => this.handleDatePickerClose()}
										value={this.state.datePickerRange}
										onChange={this.handleDatePickerSelect}
										TextFieldComponent={() => null}
									/>
								</MuiPickersUtilsProvider>
								<Button onClick={this.handleDatePickerOpen}>{this.props.schedule.range}</Button>
							</li>
							<li><Tooltip title='Back' placement='top'><IconButton onClick={this.handlePrevious}><Icon>chevron_left</Icon></IconButton></Tooltip></li>
							<li><Tooltip title='Next' placement='top'><IconButton onClick={this.handleNext}><Icon>chevron_right</Icon></IconButton></Tooltip></li>
						</ul>
						<div className='schedule'>
							<div className='schedule_row'>
								{this.props.schedule.schedule && this.props.schedule.schedule.map((scheduleDay: any) => (
									<div className={classNames('label', {'--today': scheduleDay.date.is_today})}>
										<h5 className='day'>{scheduleDay.date.day}</h5>
										<h2 className='date'>{scheduleDay.date.date}</h2>
									</div>
								))}
							</div>
							<div className='schedule_row'>
								{this.props.schedule.schedule && this.props.schedule.schedule.map((scheduleDay: any) => (
									<div className='schedule_events'>
										{scheduleDay.events.map((event: any) => (
											<div className='event'>{event.name || 'event'}</div>
										))}
									</div>
								))}
							</div>
							<div className='schedule_row'>
								{this.props.schedule.schedule && this.props.schedule.schedule.map((scheduleDay: any) => (
									<div className='schedule_blocks'>
										{scheduleDay.blocks.map((block: any) => {
											const title = block.flex ? (
												block.logs[0] ? (
													block.logs[0].staff.name 
												) : (
													block.scheduled.name || 'Scheduled'
												)
											) : (
												block.scheduled.name
											)
											const variant = block.logs[0] ? 'attended' : (
												block.pending ? 'pending' : 'missed'
											)
											return (
												<ScheduleBlock 
													title={title}
													memo={block.memo}
													variant={variant}
													onClick={this.handleBlockClick}
													details={{
														date: `${scheduleDay.date.day} ${scheduleDay.date.full_date}`,
														start: block.start,
														end: block.end,
														logs: block.logs,
														appointments: block.appointments,
														scheduled: block.scheduled,
														label: block.label
													}}
												/>
											)
										})}
									</div>
								))}
							</div>
						</div>
					</>
				)}
			</div>
		)
	}
}

const mapStateToProps = (state: any) => ({
	schedule: state.studentSchedule.schedule
})

export default connect(mapStateToProps, { fetchStudentSchedule })(Schedule)