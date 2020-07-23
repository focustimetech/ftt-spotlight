import classNames from 'classnames'
import { addDays, differenceInSeconds, format, formatDistance, subDays, formatDistanceToNow } from 'date-fns'
import { sha256 } from 'js-sha256'
import Head from 'next/head'
import React, { ReactText } from 'react'
import { connect } from 'react-redux'

import {
	Button,
	Chip,
	CircularProgress,
	Collapse,
	FormControl,
	FormHelperText,
	Icon,
	IconButton,
	Input,
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
import { Autocomplete } from '@material-ui/lab'

import { fetchBlocks } from '../actions/blockActions'
import { createAirCode, studentCheckIn } from '../actions/checkinActions'
import { ISnackbar, queueSnackbar } from '../actions/snackbarActions'
import { fetchStudents } from '../actions/studentActions'
import { fetchTopics } from '../actions/topicActions'
import { NextPageContext } from '../types'
import { IStudent, ITeacher } from '../types/auth'
import { IBlock, ICalendar, ICalendarEvent, ICalendarEventContext } from '../types/calendar'
import { AirCheckIn, ILedgerEntry} from '../types/checkin'
import { ITopic } from '../types/topic'
import { getCalendarDateKey } from '../utils/date'
import { makeDocumentTitle } from '../utils/document'
import { createFilterOptions } from '../utils/search'

import DateBlockPicker from '../components/Calendar/DateBlockPicker'
import NameNumberEntry from '../components/CheckIn/NameNumberEntry'
import Form from '../components/Form'
import { LoadingIconButton } from '../components/Form/Components/LoadingIconButton'
import LoadingSwitch from '../components/Form/Components/LoadingSwitch'
import Flexbox from '../components/Layout/Flexbox'
import Section from '../components/Layout/Section'
import TopBar from '../components/TopBar'
import withAuth from '../hocs/withAuth'
import { TableColumns } from 'src/types/table'
import EnhancedTable from '../components/Table/EnhancedTable'
import ChipContainer from 'src/components/ChipContainer'

interface ILedgerTable {
	studentId: number
	method: MethodType
	checkInDate: Date
}

type MethodType = 'Roll-call' | 'Air Check-in' | 'Name entry' | 'Number entry'
type EntryState = 'unsaved' | 'saving' | 'saved' 

interface IStudentNumber {
	value: number
	isValid: boolean
}

interface IReduxProps {
	blocks: IBlock[]
	calendar: ICalendar
	currentUser: ITeacher
	students: Record<number, IStudent>
	createAirCode: (blockId: number, date: string) => Promise<any>
	studentCheckIn: (ledgerEntry: ILedgerEntry) => Promise<any>
    queueSnackbar: (snackbar: ISnackbar) => void
}

interface ICheckInState {
	// inputValue: string
	blockId: number
	confirmStudentNumbers: boolean
	date: Date
	studentNumbers: IStudentNumber[]
	entryState: EntryState
	isEntering: boolean
	airEnabled: boolean
	loadingAir: boolean
}

class CheckIn extends React.Component<IReduxProps, ICheckInState> {
    static getInitialProps = async (context: NextPageContext) => {
		const { store } = context
		const blocks: IBlock[] = store.getState().blocks.items
		const students: Record<number, IStudent[]> = store.getState().students.students
		const topics: ITopic[] = store.getState().topics.items

		if (!blocks || blocks.length === 0) {
			await store.dispatch(fetchBlocks())
		}

		if (!students || Object.keys(students).length === 0) {
			await store.dispatch(fetchStudents())
		}

		if (!topics || topics.length === 0) {
			await store.dispatch(fetchTopics())
		}

		return {}
    }

    state: ICheckInState = {
		// inputValue: '',
		blockId: -1,
		confirmStudentNumbers: false,
		date: new Date(),
		studentNumbers: [],
		entryState: 'unsaved',
		isEntering: false,
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

	handleEnterNumber = (studentNumber: number) => {
		this.handleSelectStudent(this.findStudentByNumber(studentNumber))
	}

	handleSelectStudent = (student: IStudent) => {
		if (!student) {
			return
		}
		const { blockId } = this.state
		const topic: ITopic = this.getBlockTopics()[blockId]
		const ledgerEntry: ILedgerEntry = {
			date: getCalendarDateKey(this.state.date),
			blockId,
			studentId: student.id,
			memo: topic ? topic.memo : '',
			createdAt: getCalendarDateKey(),
			teacherId: this.props.currentUser.accountId,
			method: 'search'
		}
		this.props.studentCheckIn(ledgerEntry).then(() => {
			this.props.queueSnackbar({ message: 'Checked in student successfully.' })
		})
	}

	handleInputChange = () => {
		this.setState((state: ICheckInState) => ({
			isEntering: true,
			studentNumbers: state.entryState === 'saved' ? [] : state.studentNumbers
		}))
	}

	handleSubmitStudentNumbers = (askForConfirmation: boolean) => {
		if (askForConfirmation) {
			this.setState({ confirmStudentNumbers: true })
			return
		}
		this.setState({ entryState: 'saving', confirmStudentNumbers: false })
		setTimeout(() => {
			this.setState({ entryState: 'saved' })
		}, 2000)
	}

	handleCloseConfirmStudentNumbers = () => {
		this.setState({ confirmStudentNumbers: false })
	}

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

	findStudentByNumber = (value: React.ReactText) => {
		const str: string = value.toString()
		const hash: string = sha256(str)
		return Object.values(this.props.students).find((student: IStudent) => student.studentNumber === hash)
	}

    componentDidMount() {
		this.resetBlock()
		// this.interval = window.setInterval(this.refresh, 6000)
	}

	componentWillUnmount() {
		window.clearInterval(this.interval)
	}

	getBlockTopics = (): Record<number, ITopic> => {
		const blockTopics: Record<number, ITopic> = {}
		const dateKey: string = getCalendarDateKey(this.state.date)
		const calendarData: ICalendarEvent[] = this.props.calendar[dateKey]
		if (calendarData) {
			calendarData.forEach((event: ICalendarEvent) => {
				if (event.context && event.context.topic) {
					blockTopics[event.id] = event.context.topic
				}
			})
		}
		return blockTopics
	}

    render() {
		const { date, confirmStudentNumbers, blockId, entryState, studentNumbers } = this.state
		const { students, calendar } = this.props
		const dateKey: string = getCalendarDateKey(date)
		const currentBlock: IBlock = this.props.blocks.find((block: IBlock) => block.id === blockId)
		const blockTopics: Record<number, ITopic> = this.getBlockTopics()
		const calendarData: ICalendarEvent[] = calendar[dateKey]
		let calendarIndex: number = -1
		let calendarContext: ICalendarEventContext = {}
		let airCheckIn: AirCheckIn = null

		if (calendarData) {
			if (currentBlock) {
				calendarIndex = calendarData.findIndex((event: ICalendarEvent) => event.id === currentBlock.id)
				if (calendarData[calendarIndex]) {
					calendarContext = calendarData[calendarIndex].context
					airCheckIn = calendarData[calendarIndex].context.airCheckIn
				}
			}
		}

		const ledgerEntries: ILedgerEntry[] = calendarContext.ledgerEntries || []
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
/*
		const getOptionLabel = (key: number) => students[key] ? students[key].name : 'Undef'
		const func = (key: number, state: FilterOptionsState<number>): string => {
			console.log("STT:", state)
			return state && key === -1 ? `Add '${state.inputValue}'` : getOptionLabel(key) //students[key].name
		}
		const filterOptions = (options: number[], inputValue: string) => {
			const filtered: number[] = createFilterOptions(students, { stringify: (key: number) => func(key, inputValue) })(options, inputValue)
			console.log('INVAL:', inputValue)
			if (inputValue.length > 0) {
				filtered.push(-1)
			}
			return filtered
		}
*/

        return (
            <div className='check-in'>
                <Head><title>{makeDocumentTitle('Student Check-in')}</title></Head>
                <TopBar title='Student Check-in'>
					<DateBlockPicker
						updateCalendar
						date={date}
						onChange={this.handleChangeDate}
						variant='day'
						onSelectBlock={this.handleSelectBlock}
						blockId={this.state.blockId}
						topics={blockTopics}
						getBlockDisabled={(block: IBlock) => !blockTopics[block.id]}
					/>
				</TopBar>
				<Section>
				{/*
					<Section className='check-in__form'>
						<Autocomplete<number>
							loading={false}
							// loading={this.state.loadingInitialStudents}
							disabled={Object.keys(students).length === 0}
							// multiple // Not necessary since we're handling all out chips manually.
							autoComplete
							fullWidth
							multiple
							// size='small'
							options={Object.keys(students).map(Number)}
							getOptionLabel={func}
							// getOptionDisabled={getOptionDisabled} // Using filterSelectedOptions instead
							filterOptions={(options, { inputValue }) => filterOptions(options, inputValue)}
							renderInput={(TextFieldProps) => {console.log('TFP:', TextFieldProps); return (
								<Paper className='check-in__entry'>
									<TextField
										{...TextFieldProps}
										variant='standard'
										placeholder='Enter full name or Student Number'
										InputProps={{ ...TextFieldProps.InputProps, disableUnderline: true }}
									/>
								</Paper>
							)}}
							// renderTags={(value: number[], getTagProps) => null}
							onChange={(event: React.ChangeEvent, value: ReactText) => this.handleSelectStudent(event, Number(value))}
							// value={[]}

							// This stuff is for creating tags
							selectOnFocus
							clearOnBlur
							handleHomeEndKeys
						/>
					</Section>
							*/}
					<section className='check-in__form'>
						<Section>
							<Typography variant='h5'>Student Entry</Typography>
							<Typography variant='body1'>Enter Student Numbers using a barcode scanner, or type student's full name.</Typography>
							<NameNumberEntry
								students={Object.values(students)}
								onSelectStudent={this.handleSelectStudent}
								onEnterNumber={this.handleEnterNumber}
								matchesStudentNumber={(value) => this.findStudentByNumber(value) && (new RegExp(/^\d+$/)).test(value.toString())}
								onChange={this.handleInputChange}
							/>
						</Section>
						{/*
						<Collapse in={studentNumbers.length > 0}>
							<Flexbox className={classNames('check-in__status', `--${entryState}`)}>
								{entryState === 'unsaved' && (
									<>
										<Flexbox>
											<Icon>announcement</Icon>
											<Typography variant='subtitle1'>Entries aren't saved yet.</Typography>
										</Flexbox>
										<Button
											onClick={() => this.handleSubmitStudentNumbers(studentNumbers.some((s: IStudentNumber) => !s.isValid))}
											variant='text'
											color='inherit'>Submit</Button>
									</>
								)}
								{entryState === 'saving' && (
									<Flexbox>
										<CircularProgress size={22} color='inherit' />
										<Typography variant='subtitle1'>Saving...</Typography>
									</Flexbox>
								)}
								{entryState === 'saved' && (
									<Flexbox>
										<Icon>cloud_done</Icon>
										<Typography variant='subtitle1'>All student entries saved.</Typography>
									</Flexbox>
								)}
							</Flexbox>
							<Section>
								<ChipContainer>
									{studentNumbers.map((studentNumber: IStudentNumber, index: number) => (
										<Chip
											label={studentNumber.value}
											onDelete={() => this.handleRemoveChip(index)}
											disabled={entryState === 'saved'}
											icon={<Icon>{studentNumber.isValid ? 'check' : 'error'}</Icon>}
										/>
									))}
								</ChipContainer>
							</Section>
						</Collapse>
						*/}
					</section>
					<section className='check-in__form'>
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
					</section>
					<section className='check-in__form'>
						<Section>
							<EnhancedTable<ILedgerTable>
								columns={ledgerTableColumns}
								data={ledgerTableData}
								dateFormat={(value: Date) => formatDistanceToNow(value)}
								title='Checked in'
							/>
						</Section>
					</section>
				</Section>
            </div>
        )
    }
}

const mapStateToProps = (state: any) => ({
	blocks: state.blocks.items,
	calendar: state.calendar.calendar,
	currentUser: state.auth.user,
	students: state.students.students,
	topics: state.topics.items
})

const mapDispatchToProps = { createAirCode, fetchBlocks, fetchStudents, studentCheckIn }

export default withAuth('teacher')(connect(mapStateToProps, mapDispatchToProps)(CheckIn))
