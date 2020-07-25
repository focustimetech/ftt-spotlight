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
    Typography
} from '@material-ui/core'
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import { Autocomplete } from '@material-ui/lab'

import { fetchBlocks } from '../actions/blockActions'
import { fetchCalendar } from '../actions/calendarActions'
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

import Avatar from '../components/Avatar'
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
	blockId: number
	date: Date
	airEnabled: boolean
	loadingAir: boolean
}

class CheckIn extends React.Component<IReduxProps, ICheckInState> {
    static getInitialProps = async (context: NextPageContext) => {
		const { store } = context
		const blocks: IBlock[] = store.getState().blocks.items
		const students: Record<number, IStudent[]> = store.getState().students.students
		const topics: ITopic[] = store.getState().topics.items
		const calendar: ICalendar = store.getState().calendar.calendar

		if (!blocks || blocks.length === 0) {
			await store.dispatch(fetchBlocks())
		}

		if (!students || Object.keys(students).length === 0) {
			await store.dispatch(fetchStudents())
		}

		if (!topics || topics.length === 0) {
			await store.dispatch(fetchTopics())
		}

		if (!calendar[getCalendarDateKey()]) {
			await store.dispatch(fetchCalendar)
		}

		return {}
    }

    state: ICheckInState = {
		blockId: -1,
		date: new Date(),
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
			studentId: student.accountId,
			memo: topic ? topic.memo : '',
			createdAt: getCalendarDateKey(),
			teacherId: this.props.currentUser.accountId,
			method: 'search'
		}
		this.props.studentCheckIn(ledgerEntry).then(() => {
			this.props.queueSnackbar({ message: 'Checked in student successfully.' })
		})
	}

	handleRemoveLedgerEntry = (index: number) => {
		//
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
		const { date, blockId } = this.state
		const { students, calendar } = this.props
		const dateKey: string = getCalendarDateKey(date)
		const currentBlock: IBlock = this.props.blocks.find((block: IBlock) => block.id === blockId)
		console.log('currentBlock:', currentBlock)
		console.log('this.props.blocks', this.props.blocks)
		console.log('this.state.blockId', blockId)
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
		console.log('ledgerEntries:', ledgerEntries)

		const airCodeLength: number = airCheckIn ? airCheckIn.code.length : -1
		const airCode: string = airCheckIn
			? `${airCheckIn.code.slice(0, Math.floor(airCodeLength / 2))} ${airCheckIn.code.slice(Math.floor(airCodeLength / 2))}`
			: 'nnn nnn'

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
						blockId={blockId}
						topics={blockTopics}
						getBlockDisabled={(block: IBlock) => !blockTopics[block.id]}
					/>
				</TopBar>
				<Section>
					<section className='check-in__form'>
						<Section>
							<Typography variant='h5'>Student Entry</Typography>
							<Typography variant='body1'>Enter Student Numbers using a barcode scanner, or type student's full name.</Typography>
							<NameNumberEntry
								students={Object.values(students)}
								onSelectStudent={this.handleSelectStudent}
								onEnterNumber={this.handleEnterNumber}
								matchesStudentNumber={(value) => this.findStudentByNumber(value) && (new RegExp(/^\d+$/)).test(value.toString())}
								disabled={!currentBlock}
							/>
						</Section>
						<Collapse in={ledgerEntries.length > 0}>
							<Section>
								<ChipContainer>
									{ledgerEntries.map((ledgerEntry: ILedgerEntry, index: number) => {
										const student: IStudent = students[ledgerEntry.studentId]
										return student ? (
											<li key={index}>
												<Chip
													avatar={<Avatar size='chip' avatar={student.avatar} />}
													label={student.name}
													// onDelete={() => this.handleRemoveLedgerEntry(index)}
												/>
											</li>
										) : (
											<li key={index}><Chip label='Unkown Student' /></li>
										)
									})}
								</ChipContainer>
							</Section>
						</Collapse>
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

const mapDispatchToProps = { createAirCode, fetchBlocks, fetchStudents, studentCheckIn, queueSnackbar }

export default withAuth('teacher')(connect(mapStateToProps, mapDispatchToProps)(CheckIn))
