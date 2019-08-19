import * as React from 'react'
import classNames from 'classnames'
import ContentLoader from 'react-content-loader'
import DateFnsUtils from '@date-io/date-fns'

import {
    Button,
    Icon,
    IconButton,
    Tooltip
} from '@material-ui/core'
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers'

import { CalendarDialog } from './CalendarDialog'
import { CalendarBlock } from './CalendarBlock'
import { ICalendarDay, ICalendarEvent, IBlockDetails, ICalendarBlock } from '../../types/calendar'

const emptyIBlockDetails: IBlockDetails = {
	date: '',
	start: '',
	end: '',
	label: '',
	pending: true,
	flex: false,
	data: {}
}

interface IProps {
    onPrevious: () => void
    onNext: () => void
    loading: boolean
    hasPrevious: boolean
    hasNext: boolean
    rangeLabel: string
    minDate: Date
    maxDate: Date
    calendar: ICalendarDay[]
}

export const Calendar = (props: IProps) => {
	const [datePickerOpen, setDatePickerOpen]: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
		= React.useState(false)
	const [datePickerRange, setDatePickerRange]: [Date, React.Dispatch<React.SetStateAction<Date>>]
		= React.useState(new Date())
	const [dialogOpen, setDialogOpen]: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
		= React.useState(false)
	const [blockDetails, setBlockDetials]: [IBlockDetails, React.Dispatch<React.SetStateAction<IBlockDetails>>]
		= React.useState(emptyIBlockDetails)

	const CalendarLoader = () => (
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
	)

	const PreviousButton = () => (
		<IconButton disabled={!props.hasPrevious} onClick={() => props.onPrevious()}>
			<Icon>chevron_left</Icon>
		</IconButton>
	)

	const NextButton = () => (
		<IconButton disabled={!props.hasNext} onClick={() => props.onNext()}>
			<Icon>chevron_right</Icon>
		</IconButton>
	)

	const handleBlockClick = (blockDetails: IBlockDetails) => {
		setBlockDetials(blockDetails)
	}

	const handleDialogClose = () => {
		setDialogOpen(false)
	}

	const handleDatePickerSelect = (event: any) => {
		setDatePickerRange(event.target.value)
	}

	return (
		<div className='calendar_container'>
			{props.loading || !(props.calendar) ? (
				<CalendarLoader />
			) : (
				<>
					<CalendarDialog
						details={blockDetails}
						open={dialogOpen}
						onClose={handleDialogClose}
					/>
					<ul className='calendar_header'>
						<li>
							<MuiPickersUtilsProvider utils={DateFnsUtils}>
								<DatePicker
									variant='dialog'
									open={datePickerOpen}
									onClose={() => setDatePickerOpen(false)}
									value={datePickerRange}
									onChange={handleDatePickerSelect}
									minDate={props.minDate}
									maxDate={props.maxDate}
									TextFieldComponent={() => null}
								/>
							</MuiPickersUtilsProvider>
							<Button onClick={() => setDatePickerOpen(true)}>{props.rangeLabel || 'Select Date'}</Button>
						</li>
						<li>
							{props.hasPrevious ? <PreviousButton /> : (
								<Tooltip title='Back' placement='top'>
									<PreviousButton />
								</Tooltip>
							)}
						</li>
						<li>
							{props.hasNext ? <NextButton /> : (
								<Tooltip title='Next' placement='top'>
									<NextButton />
								</Tooltip>
							)}
							
						</li>
					</ul>
					<div className='calendar'>
						<div className='calendar_row'>
							{props.calendar.map((calendarDay: ICalendarDay) => (
								<div className={classNames('label', {'--today': calendarDay.date.is_today})} key={calendarDay.date.full_date}>
									<h5 className='day'>{calendarDay.date.day}</h5>
									<h2 className='date'>{calendarDay.date.date}</h2>
								</div>
							))}
						</div>
						<div className='calendar_row'>
							{props.calendar.map((calendarDay: ICalendarDay) => (
								<div className='calendar_events'>
									{calendarDay.events.map((event: ICalendarEvent, index: number) => (
										<div className='event' key={index}>{event.name || 'event'}</div>
									))}
								</div>
							))}
						</div>
						<div className='calendar_row'>
							{props.calendar.map((calendarDay: ICalendarDay, index: number) => (
								<div className='calendar_blocks' key={index}>
									{calendarDay.blocks.map((block: ICalendarBlock, blockIndex: number) => (
										<CalendarBlock
											key={blockIndex}
											{...block}
											onClick={() => handleBlockClick(block.details)}
										/>
									))}
								</div>
							))}
						</div>
					</div>
				</>
			)}
		</div>
	)
}
