import { addDays, differenceInSeconds, format, formatDistance, subDays } from 'date-fns'
import classNames from 'classnames'
import Head from 'next/head'
import React from 'react'
import { connect } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'

import {
	Chip,
	ClickAwayListener,
	Collapse,
	FormControl,
	FormHelperText,
	Icon,
	InputBase,
    InputLabel,
	MenuItem,
	Paper,
	Popper,
    Select,
    TextField,
    Tooltip,
    Typography
} from '@material-ui/core'
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'

import { fetchBlocks } from '../actions/blockActions'
import { updateLedgerBuffer } from '../actions/checkinActions'
import { ISnackbar, queueSnackbar } from '../actions/snackbarActions'
import { NextPageContext } from '../types'
import { IBlock, ICalendar } from '../types/calendar'
import { LedgerBuffer, ILedgerChip, INewLedgerChip } from '../types/checkin'
import { makeDocumentTitle } from '../utils/document'

import withAuth from '../hocs/withAuth'
import CalendarHeader from '../components/Calendar/CalendarHeader'
import Form from '../components/Form'
import { LoadingIconButton } from '../components/Form/Components/LoadingIconButton'
import Flexbox from '../components/Layout/Flexbox'
import Section from '../components/Layout/Section'
import TopBar from '../components/TopBar'
import { getCalendarDateKey } from '../utils/date'

interface IReduxProps {
	blocks: IBlock[]
	calendar: ICalendar
	updateLedgerBuffer: (ledgerChip: INewLedgerChip) => void
    queueSnackbar: (snackbar: ISnackbar) => void
}

interface ICheckInState {
	inputValue: string
    blockId: number
    date: Date
}

class CheckIn extends React.Component<IReduxProps, ICheckInState> {
    static getInitialProps = async (context: NextPageContext) => {
        const { store } = context
        return await store.dispatch(fetchBlocks())
    }

    state: ICheckInState = {
		inputValue: '',
        blockId: -1,
        date: new Date()
	}
	
	timeout: number = -1

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
		this.setState({ inputValue: '' })
		const key: string = this.createUniqueId()
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

    componentDidMount() {
		this.resetBlock()
		this.timeout = window.setTimeout(this.refresh, 6000)
	}
	
	componentWillUnmount() {
		window.clearTimeout(this.timeout)
	}

    render() {
		const { date } = this.state
        const weekDay: number = Number(format(date, 'i'))
		const blocks: IBlock[] = this.props.blocks.filter((block: IBlock) => block.weekDay === weekDay)
		const currentBlock: IBlock = this.props.blocks.find((block: IBlock) => block.id === this.state.blockId)
		const now: Date = new Date()
		let blockStartDate: Date = null
		let blockEndDate: Date = null
		let blockHasStarted: boolean = false
		let blockHasEnded: boolean = false
		if (currentBlock) {
			blockStartDate = new Date(`${date.toDateString()} ${currentBlock.startTime}`)
			blockEndDate = new Date(`${date.toDateString()} ${currentBlock.endTime}`)
			blockHasEnded = blockEndDate < now
			blockHasStarted = blockStartDate < now
		}
		const blockIsPending: boolean = blockHasStarted && !blockHasEnded

		// console.log('now:', now)
		// console.log('blockStartDate:', blockStartDate)
		// console.log('blockEndDate:', blockEndDate)

        return (
            <>
                <Head><title>{makeDocumentTitle('Student Check-in')}</title></Head>
                <TopBar title='Student Check-in' />
                <Section>
                    <CalendarHeader
                        date={this.state.date}
                        onChange={this.handleChangeDate}
                        onNext={this.handleNext}
                        onPrevious={this.handlePrevious}
                        variant='day'
                    />
					<Flexbox>
						<FormControl variant='outlined' margin='dense'>
							<InputLabel id='check-in-block-label'>Block</InputLabel>
							<Select
								labelId='check-in-block-label'
								variant='outlined'
								value={this.state.blockId}
								onChange={this.handleSelectBlock}
								label='Block'
								disabled={!blocks || blocks.length <= 1}
							>
								<MenuItem value={-1}><em>Select Block</em></MenuItem>
								{blocks.map((block: IBlock) => (
									<MenuItem value={block.id}>{block.label}</MenuItem>
								))}
							</Select>
						</FormControl>
						{blockStartDate && blockEndDate && (
							<Typography variant='body1' className={classNames('check-in__block-timing', { '--pending': blockIsPending })}>
								{blockHasEnded
									? `Ended ${formatDistance(now, blockEndDate)} ago`
									: (!blockHasStarted ? `Starts in ${formatDistance(now, blockStartDate)}` : (
										differenceInSeconds(now, blockStartDate) < differenceInSeconds(now, blockEndDate)
											? `Started ${formatDistance(now, blockStartDate)} ago`
											: `Ends in ${formatDistance(now, blockEndDate)}`
									))
								}
							</Typography>
						)}
					</Flexbox>
                </Section>
                <Section className='check-in__form' fullWidth>
					<ClickAwayListener onClickAway={() => null}>
						<div className='chip_select'>
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
							<Collapse in={false}>
								<div className={classNames('chips_container', { '--has_chips': false })}>
									{/*this.props.chips.map((chip: ISelectChip<T>, index: number) => {
										const isDuplicate: boolean = false
										const avatar: JSX.Element = chip.avatar ? (
											chip.loading ? (
												<Avatar><CircularProgress size={24} /></Avatar>
											) : (
												<Avatar className={classNames('chip_avatar', {[`--${chip.avatar.color}`]: chip.avatar.color })}>
													{chip.avatar.initials}
												</Avatar>
											)
										) : undefined

										const chipComponent: JSX.Element = (
											<Chip
												className={classNames({'--duplicate': isDuplicate})}
												key={index}
												avatar={avatar}
												label={chip.label}
												onDelete={() => this.handleRemoveChip(index, chip.onRemove)}
											/>
										)
										return chip.title ? <Tooltip placement='bottom-start' key={index} title={chip.title}>{chipComponent}</Tooltip> : chipComponent
									})*/}
								</div>
							</Collapse>
							{/*
							<Popper
								className='chip_select__popper'
								anchorEl={this.state.resultsRef}
								open={resultsOpen}
								disablePortal
								transition
								placement='bottom'
							>
								{({ TransitionProps }) => (
									<Grow {...TransitionProps}>
										<Paper>
											<MenuList>
												{this.props.queryResults.length > 0 ? (
													this.props.queryResults.map((queryResult: ISelectItem<T>, index: number) => (
														<MenuItem selected={queryResult.selected} key={index} onClick={() => this.handleSelectQueryResult(queryResult)}>
															{queryResult.avatar && (
																<Avatar className={classNames('chip_avatar', `--${queryResult.avatar.color}`)}>
																	{queryResult.avatar.initials}
																</Avatar>
															)}
															<span>{queryResult.label}</span>
														</MenuItem>
													))
												) : (
													<Typography className='no_results'>No results found.</Typography>
												)}
											</MenuList>
										</Paper>
									</Grow>
								)}
							</Popper>
							*/}
						</div>
					</ClickAwayListener>
                </Section>
            </>
        )
    }
}

const mapStateToProps = (state) => ({
	blocks: state.blocks.items,
	calendar: state.calendar.calendar
})

const mapDispatchToProps = { fetchBlocks, updateLedgerBuffer }

export default withAuth('teacher')(connect(mapStateToProps, mapDispatchToProps)(CheckIn))