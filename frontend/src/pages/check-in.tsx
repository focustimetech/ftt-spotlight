import { addDays, differenceInSeconds, format, formatDistance, subDays } from 'date-fns'
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
import { createAirCode, updateLedgerBuffer } from '../actions/checkinActions'
import { ISnackbar, queueSnackbar } from '../actions/snackbarActions'
import { NextPageContext } from '../types'
import { IStudent } from '../types/auth'
import { IBlock, ICalendar, ICalendarEvent } from '../types/calendar'
import { AirCheckIn, ILedgerChip, INewLedgerChip, LedgerBuffer} from '../types/checkin'
import { getCalendarDateKey } from '../utils/date'
import { makeDocumentTitle } from '../utils/document'

import DateBlockPicker from '../components/Calendar/DateBlockPicker'
import Form from '../components/Form'
import { LoadingIconButton } from '../components/Form/Components/LoadingIconButton'
import LoadingSwitch from '../components/Form/Components/LoadingSwitch'
import Flexbox from '../components/Layout/Flexbox'
import Section from '../components/Layout/Section'
import TopBar from '../components/TopBar'
import withAuth from '../hocs/withAuth'

interface IReduxProps {
	blocks: IBlock[]
	calendar: ICalendar
	createAirCode: (blockId: number, date: string) => Promise<any>
	updateLedgerBuffer: (ledgerChip: INewLedgerChip) => void
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
		const students: IStudent[] = store.getState().students.items

		if (!blocks || blocks.length === 0) {
			return await store.dispatch(fetchBlocks())
		}
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

    handleNext = () => {
        this.setState((state: ICheckInState) => ({
            date: addDays(state.date, 1)
        }), () => {
			this.resetBlock()
		})
    }

    handlePrevious = () => {
        this.setState((state: ICheckInState) => ({
            date: subDays(state.date, 1)
        }), () => {
			this.resetBlock()
		})
    }

	resetBlock = () => {
		const blockId: number = this.props.blocks && this.props.blocks.length === 1
			? this.props.blocks[0].id
			: -1
		this.setState({ blockId })
	}

	createUniqueId = (): string => {
		return uuidv4()
	}

	handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		this.setState({ inputValue: event.target.value })
	}

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
		const { date } = this.state
        const weekDay: number = Number(format(date, 'i'))
		const blocks: IBlock[] = this.props.blocks.filter((block: IBlock) => block.weekDay === weekDay)
		const currentBlock: IBlock = this.props.blocks.find((block: IBlock) => block.id === this.state.blockId)
		const now: Date = new Date()
		const calendarDateKey: string = getCalendarDateKey(date)
		let blockStartDate: Date = null
		let blockEndDate: Date = null
		let blockHasStarted: boolean = false
		let blockHasEnded: boolean = false
		let calendarData: ICalendarEvent[] = []
		let calendarIndex: number = -1
		let ledgerBuffer: LedgerBuffer = {}
		let airCheckIn: AirCheckIn = null
		if (currentBlock) {
			blockStartDate = new Date(`${date.toDateString()} ${currentBlock.startTime}`)
			blockEndDate = new Date(`${date.toDateString()} ${currentBlock.endTime}`)
			blockHasEnded = blockEndDate < now
			blockHasStarted = blockStartDate < now
			calendarData = this.props.calendar[calendarDateKey]
			if (calendarData) {
				calendarIndex = calendarData.findIndex((event: ICalendarEvent) => event.id === currentBlock.id)
			}
			if (calendarData && calendarData[calendarIndex]) {
				ledgerBuffer = calendarData[calendarIndex].context.ledgerBuffer || {}
				airCheckIn = calendarData[calendarIndex].context.airCheckIn
			}
		}
		const blockIsPending: boolean = blockHasStarted && !blockHasEnded
		const hasChips: boolean = ledgerBuffer && Object.keys(ledgerBuffer).length > 0
		const airCodeLength: number = airCheckIn ? airCheckIn.code.length : -1
		const airCode: string = airCheckIn
			? `${airCheckIn.code.slice(0, Math.floor(airCodeLength / 2))} ${airCheckIn.code.slice(Math.floor(airCodeLength / 2))}`
			: 'nnn nnn'

		// console.log('calendarDateKey:', calendarDateKey)
		// console.log('calendarData:', calendarData)
		// console.log('calendarIndex:', calendarIndex)

        return (
            <div className='check-in'>
                <Head><title>{makeDocumentTitle('Student Check-in')}</title></Head>
                <TopBar title='Student Check-in'>
					<DateBlockPicker
						date={date}
						onChange={this.handleChangeDate}
						onNext={this.handleNext}
						onPrevious={this.handlePrevious}
						variant='day'
						onSelectBlock={this.handleSelectBlock}
						blockId={this.state.blockId}
					/>
				</TopBar>
                <Section className='check-in__form' fullWidth>
					<Section>
						<Typography variant='h5'>Student Entry</Typography>
						<Typography variant='body1'>Enter Student Numbers using a barcode scanner, or type student's full name.</Typography>
						<div className={classNames('chip_select', { '--hasChips': hasChips })}>
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
												<LoadingIconButton loading={false} disabled={false} onClick={() => this.handleCreateChip()}>
													<Icon>keyboard_return</Icon>
												</LoadingIconButton>
											</Tooltip>
										/*)*/}
									</div>
								</div>
							</Paper>
							<FormHelperText></FormHelperText>
							<Collapse in={hasChips}>
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
									{Object.keys(ledgerBuffer).map((bufferKey: string) => {
										return (

											<Chip
												key={bufferKey}
												label={ledgerBuffer[bufferKey].value}
												onDelete={() => null}
											/>
										)
									})}
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
            </div>
        )
    }
}

const mapStateToProps = (state: any) => ({
	blocks: state.blocks.items,
	calendar: state.calendar.calendar
})

const mapDispatchToProps = { createAirCode, fetchBlocks, updateLedgerBuffer }

export default withAuth('teacher')(connect(mapStateToProps, mapDispatchToProps)(CheckIn))
