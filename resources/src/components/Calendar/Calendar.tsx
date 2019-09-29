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
import {
	ICalendarDay,
	ICalendarEvent,
	IBlockDetails,
	ICalendarBlock,
	ICalendarDialogGroup
} from '../../types/calendar'

const emptyIBlockDetails: IBlockDetails = {
	block_id: 0,
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
	onDatePickerChange: (date: Date) => void
    loading: boolean
    hasPrevious: boolean
    hasNext: boolean
    rangeLabel: string
    minDate: Date
    maxDate: Date
	calendar: ICalendarDay[]
	calendarDialogGroups: ICalendarDialogGroup[]
	dialogOpen?: boolean
	onDialogOpen?: () => void
	onDialogClose?: () => void
	onBlockClick?: (blockDetails: IBlockDetails) => void
}

export const Calendar = (props: IProps) => {
	const [datePickerOpen, setDatePickerOpen]: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
		= React.useState(false)
	const [datePickerRange, setDatePickerRange]: [Date, React.Dispatch<React.SetStateAction<Date>>]
		= React.useState(new Date())
	const [dialogOpen, setDialogOpen]: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
		= React.useState(false)
	const [blockDetails, setBlockDetails]: [IBlockDetails, React.Dispatch<React.SetStateAction<IBlockDetails>>]
		= React.useState(emptyIBlockDetails)

	const CalendarLoader = () => (
		<>
			<div style={{width: 216, height: 64}}>
				<ContentLoader width={216} height={64}>
					<rect x={0} y={14} rx={4} ry={4} width={120} height={24} />
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

	const previousButton = (
		<IconButton disabled={!props.hasPrevious} onClick={() => props.onPrevious()}>
			<Icon>chevron_left</Icon>
		</IconButton>
	)

	const nextButton = (
		<IconButton disabled={!props.hasNext} onClick={() => props.onNext()}>
			<Icon>chevron_right</Icon>
		</IconButton>
	)

	const handleBlockClick = (blockDetails: IBlockDetails) => {
		setBlockDetails(blockDetails)
		props.onDialogOpen()
		setDialogOpen(true)
		if (props.onBlockClick) {
			props.onBlockClick(blockDetails)
		}
	}

	const handleDialogClose = () => {
		setDialogOpen(false)
		props.onDialogClose()
	}

	const handleDatePickerSelect = (date: Date) => {
		setDatePickerRange(date)
		props.onDatePickerChange(date)
	}

	return (
		<div className='calendar_container'>
			{props.loading || !(props.calendar) ? (
				<CalendarLoader />
			) : (
				<>
					<CalendarDialog
						blockDetails={blockDetails}
						open={dialogOpen && props.dialogOpen !== false}
						onClose={handleDialogClose}
						calendarDialogGroups={props.calendarDialogGroups}
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
							{props.hasPrevious ? previousButton : (
								<Tooltip title='Back' placement='top'>
									{previousButton}
								</Tooltip>
							)}
						</li>
						<li>
							{props.hasNext ? nextButton : (
								<Tooltip title='Next' placement='top'>
									{nextButton}
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
							{props.calendar.map((calendarDay: ICalendarDay, index: number) => (
								<div className='calendar_events' key={index}>
									{calendarDay.events.map((event: ICalendarEvent, index: number) => (
										<div className='event' key={index}>{event.name || 'event'}</div>
									))}
								</div>
							))}
						</div>
						<div className='calendar_row'>
							{props.calendar.map((calendarDay: ICalendarDay, index: number) => (
								<div className='calendar_blocks' key={index}>
									{calendarDay.blocks.map((block: ICalendarBlock, blockIndex: number) => {
										return <CalendarBlock
											key={blockIndex}
											{...block}
											onClick={() => handleBlockClick(block.details)}
										/>
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
