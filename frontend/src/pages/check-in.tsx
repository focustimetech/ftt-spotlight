import { addDays, differenceInSeconds, format, formatDistance, subDays, formatDistanceToNow } from 'date-fns'
import classNames from 'classnames'
import Head from 'next/head'
import React from 'react'
import { connect } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'

import {
	Chip,
	CircularProgress,
	Collapse,
	FormControl,
	FormHelperText,
	Icon,
	IconButton,
	InputBase,
    InputLabel,
	MenuItem,
	Paper,
	Popper,
	Select,
	Switch,
    TextField,
    Tooltip,
    Typography,
} from '@material-ui/core'
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'

import { fetchBlocks } from '../actions/blockActions'
import { createAirCode } from '../actions/checkinActions'
import { ISnackbar, queueSnackbar } from '../actions/snackbarActions'
import { fetchStudents } from '../actions/studentActions'
import { NextPageContext } from '../types'
import { IStudent } from '../types/auth'
import { IBlock, ICalendar, ICalendarEvent, ICalendarEventContext } from '../types/calendar'
import { AirCheckIn, ILedgerEntry} from '../types/checkin'
import { getCalendarDateKey } from '../utils/date'
import { makeDocumentTitle } from '../utils/document'
import { createFilterOptions } from '../utils/search'

import DateBlockPicker from '../components/Calendar/DateBlockPicker'
import Form from '../components/Form'
import { LoadingIconButton } from '../components/Form/Components/LoadingIconButton'
import LoadingSwitch from '../components/Form/Components/LoadingSwitch'
import Flexbox from '../components/Layout/Flexbox'
import Section from '../components/Layout/Section'
import TopBar from '../components/TopBar'
import withAuth from '../hocs/withAuth'
import { Autocomplete } from '@material-ui/lab'
import { TableColumns } from 'src/types/table'
import EnhancedTable from '..//components/Table/EnhancedTable'

interface ILedgerTable {
	studentId: number
	method: MethodType
	checkInDate: Date
}

type MethodType = 'Roll-call' | 'Air Check-in' | 'Name entry' | 'Number entry'

interface IReduxProps {
	blocks: IBlock[]
	calendar: ICalendar
	students: Record<number, IStudent>
	createAirCode: (blockId: number, date: string) => Promise<any>
    queueSnackbar: (snackbar: ISnackbar) => void
}

interface ICheckInState {
	inputValue: string
    blockId: number
	date: Date
	syncing: boolean
	lastLedgerKey: string
	airEnabled: boolean
	loadingAir: boolean
}

class CheckIn extends React.Component<IReduxProps, ICheckInState> {
    static getInitialProps = async (context: NextPageContext) => {
		const { store } = context
		const blocks: IBlock[] = store.getState().blocks.items
		const students: Record<number, IStudent[]> = store.getState().students.students

		if (!blocks || blocks.length === 0) {
			await store.dispatch(fetchBlocks())
		}

		if (!students || Object.keys(students).length === 0) {
			await store.dispatch(fetchStudents())
		}

		return {}
    }

    state: ICheckInState = {
		inputValue: '',
        blockId: -1,
		date: new Date(),
		syncing: false,
		lastLedgerKey: null,
		airEnabled: false,
		loadingAir: false
	}

	interval: number = -1

    handleChangeDate = (date: Date) => {
        this.setState({ date }, () => {
			this.resetBlock()
		})
    }

	resetBlock = () => {
		const blockId: number = this.props.blocks && this.props.blocks.length === 1
			? this.props.blocks[0].id
			: -1
		this.setState({ blockId })
	}

	handleSelectStudent = (thing: any) => {
		// const { value } = event.target
		console.log('thing=', thing)
	}

	/*
	createUniqueId = (): string => {
		return uuidv4()
	}
	*/

	handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		this.setState({ inputValue: event.target.value })
	}

	/*
	handleCreateChip = () => {
		const { blockId, date, inputValue } = this.state
		const key: string = this.createUniqueId()
		this.setState({ inputValue: '', syncing: true, lastLedgerKey: key })
		const chip: ILedgerChip = {
			value: inputValue,
			timestamp: new Date(),
			status: 'queued'
		}
		const ledgerBuffer: INewLedgerChip = {
			blockId,
			date: getCalendarDateKey(date),
			buffer: { [key]: chip }
		}
		this.props.updateLedgerBuffer(ledgerBuffer)
		setTimeout(() => {
			if (this.state.lastLedgerKey === key) {
				this.setState({ syncing: false })
			}
		}, 6000)
	}
	*/

    /**
     * Change this from any to the right event type.
     */
    handleSelectBlock = (event: React.ChangeEvent<{ name?: string, value: number }>) => {
        const { value } = event.target
        this.setState({ blockId: value})
    }

	refresh = () => {
		this.forceUpdate()
	}

	handleAirToggle = () => {
		if (this.state.airEnabled) {
			this.setState({ airEnabled: false })
		} else {
			this.setState({ loadingAir: true })
			this.props.createAirCode(this.state.blockId, getCalendarDateKey(this.state.date)).then(() => {
				this.setState({ loadingAir: false, airEnabled: true })
			}, (err) => {
				return this.setState({ loadingAir: false })
			})
		}
	}

    componentDidMount() {
		this.resetBlock()
		this.interval = window.setInterval(this.refresh, 6000)
	}

	componentWillUnmount() {
		window.clearInterval(this.interval)
	}

    render() {
		const { date, blockId } = this.state
		const { students, calendar } = this.props
		const dateKey: string = getCalendarDateKey(date)
		const currentBlock: IBlock = this.props.blocks.find((block: IBlock) => block.id === this.state.blockId)
		const calendarDateKey: string = getCalendarDateKey(date)
		let calendarData: ICalendarEvent[] = []
		let calendarIndex: number = -1
		let calendarContext: ICalendarEventContext = {}
		let airCheckIn: AirCheckIn = null
		if (currentBlock) {
			calendarData = this.props.calendar[calendarDateKey]
			if (calendarData) {
				calendarIndex = calendarData.findIndex((event: ICalendarEvent) => event.id === currentBlock.id)
				calendarContext = calendar[dateKey][calendarIndex].context
			}
			if (calendarData && calendarData[calendarIndex]) {
				airCheckIn = calendarData[calendarIndex].context.airCheckIn
			}
		}

		const ledgerEntries: ILedgerEntry[] = calendarContext.ledgerEntries || []
		console.log('ledgerEntries:', ledgerEntries)
		const ledgerTableColumns: TableColumns<ILedgerTable> = {
			studentId: { label: 'Student', searchable: false, filterable: false, type: 'string' },
			method: { label: 'Method', searchable: false, filterable: true, type: 'enum', values: []},
			checkInDate: { label: 'Time', searchable: false, filterable: true, type: 'date' }
		}
		const ledgerTableData: ILedgerTable[] = ledgerEntries.map((entry: ILedgerEntry) => ({
			studentId: entry.studentId,
			method: entry.method as MethodType,
			checkInDate: new Date(entry.createdAt)
		}))

		const airCodeLength: number = airCheckIn ? airCheckIn.code.length : -1
		const airCode: string = airCheckIn
			? `${airCheckIn.code.slice(0, Math.floor(airCodeLength / 2))} ${airCheckIn.code.slice(Math.floor(airCodeLength / 2))}`
			: 'nnn nnn'

		const getOptionLabel = (key: number) => students[key].name
		const filterOptions = createFilterOptions(students, { stringify: getOptionLabel })
		const getOptionDisabled = (key: number) => false

        return (
            <div className='check-in'>
                <Head><title>{makeDocumentTitle('Student Check-in')}</title></Head>
                <TopBar title='Student Check-in'>
					<DateBlockPicker
						date={date}
						onChange={this.handleChangeDate}
						variant='day'
						onSelectBlock={this.handleSelectBlock}
						blockId={this.state.blockId}
					/>
				</TopBar>
				<Section className='check-in__form' fullWidth>
					<Autocomplete<number>
						// loading={this.state.loadingInitialStudents}
						disabled={Object.keys(students).length === 0}
						multiple
						autoComplete
						fullWidth
						// size='small'
						options={Object.keys(students).map((key: string) => Number(key))}
						getOptionLabel={getOptionLabel}
						getOptionDisabled={getOptionDisabled}
						filterOptions={(options, { inputValue }) => filterOptions(options, inputValue)}
						renderInput={(TextFieldProps) => (
							<Paper>
								<TextField
									{...TextFieldProps}
									// label='Students'
									placeholder='Enter full name or Student Number'
								/>
							</Paper>
						)}
						renderTags={(value: number[], getTagProps) => null}
						onChange={(e, val) => this.handleSelectStudent(val)}
						value={[20]}
					/>
				</Section>
                <Section className='check-in__form' fullWidth>
					<Section>
						<Typography variant='h5'>Student Entry</Typography>
						<Typography variant='body1'>Enter Student Numbers using a barcode scanner, or type student's full name.</Typography>
						<div className={classNames('chip_select', { '--hasChips': true })}>
							<Paper>
								<div className='chip_select__textfield'>
									<div className='chip_select__actions'>
										{false && (
											<span><Icon>search</Icon></span>
										)}
										<InputBase
											className='chip_select__input'
											value={this.state.inputValue}
											onChange={this.handleInputChange}
											// onFocus={this.handleInputFocus}
											placeholder='Enter full name or Student Number'
											// onKeyDown={this.onKeyDown}
											// onPaste={this.onPaste}
											autoFocus
										/>
										{/*searchable || !this.props.onCreateChip ? (
											this.props.loading && (
												<div className='chip_select__loading'><CircularProgress size={24} /></div>
											)
										) : (*/
											<Tooltip title='Add (Enter)'>
												<LoadingIconButton loading={false} disabled={false} onClick={() => null}>
													<Icon>keyboard_return</Icon>
												</LoadingIconButton>
											</Tooltip>
										/*)*/}
									</div>
								</div>
							</Paper>
							<FormHelperText></FormHelperText>
							<Collapse in={true}>
								<Flexbox className={classNames('check-in__status', { '--saved': !this.state.syncing })}>
									{this.state.syncing ? (
										<>
											<CircularProgress size={22} />
											<Typography variant='subtitle1'>Saving...</Typography>
										</>
									) : (
										<>
											<Icon>cloud_done</Icon>
											<Typography variant='subtitle1'>All changes saved. We'll proccess these entries on our end.</Typography>
										</>
									)}
								</Flexbox>
								<div className='chips_container'>
									
								</div>
							</Collapse>
						</div>
					</Section>
                </Section>
				<Section className='check-in__form' fullWidth>
					<Section>
						<Flexbox justifyContent='space-between'>
							<div>
								<Typography variant='h5'>Air Check-in</Typography>
								<Typography variant='body1'>Your Air Check-in code is listed below.</Typography>
							</div>
							<Flexbox>
								<Tooltip title='Use New Code'>
									<IconButton><Icon>refresh</Icon></IconButton>
								</Tooltip>
								<LoadingSwitch
									loading={this.state.loadingAir}
									color='primary'
									onClick={() => this.handleAirToggle()}
									checked={this.state.airEnabled}
								/>
							</Flexbox>
						</Flexbox>
						<Collapse in={this.state.airEnabled && Boolean(airCheckIn)}>
							<Flexbox className='check-in__code' justifyContent='space-around'>
								<Typography variant='h4'>{airCode}</Typography>
							</Flexbox>
						</Collapse>
					</Section>
				</Section>
				<Section className='check-in__form' fullWidth>
					<Section>
						<EnhancedTable<ILedgerTable>
							columns={ledgerTableColumns}
							data={ledgerTableData}
							dateFormat={(value: Date) => formatDistanceToNow(value)}
							title='Checked in'
						/>
					</Section>
				</Section>
            </div>
        )
    }
}

const mapStateToProps = (state: any) => ({
	blocks: state.blocks.items,
	calendar: state.calendar.calendar,
	students: state.students.students
})

const mapDispatchToProps = { createAirCode, fetchBlocks, fetchStudents }

export default withAuth('teacher')(connect(mapStateToProps, mapDispatchToProps)(CheckIn))
