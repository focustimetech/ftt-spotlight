import { addDays, subDays } from 'date-fns'
import classNames from 'classnames'
import Head from 'next/head'
import React from 'react'
import { connect } from 'react-redux'

import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Tooltip,
    Typography
} from '@material-ui/core'
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'

import { fetchBlocks } from '../actions/blockActions'
import { ISnackbar, queueSnackbar } from '../actions/snackbarActions'
import { NextPageContext } from '../types'
import { IBlock } from '../types/calendar'
import { makeDocumentTitle } from '../utils/document'

import withAuth from '../hocs/withAuth'
import CalendarHeader from '../components/Calendar/CalendarHeader'
import Section from '../components/Layout/Section'
import TopBar from '../components/TopBar'

interface IReduxProps {
    blocks: IBlock[]
    // fetchBlocks: () => Promise<any>
    queueSnackbar: (snackbar: ISnackbar) => void
}

interface ICheckInState {
    blockId: number
    date: Date
}

class CheckIn extends React.Component<IReduxProps, ICheckInState> {
    static getInitialProps = async (context: NextPageContext) => {
        const { store } = context
        return await store.dispatch(fetchBlocks())
    }

    state: ICheckInState = {
        blockId: -1,
        date: new Date()
    }

    handleChangeDate = (date: Date) => {
        this.setState({ date })
    }

    handleNext = () => {
        this.setState((state: ICheckInState) => ({
            date: addDays(state.date, 1)
        }))
    }

    handlePrevious = () => {
        this.setState((state: ICheckInState) => ({
            date: subDays(state.date, 1)
        }))
    }

    /**
     * Change this from any to the right event type.
     */
    handleSelectBlock = (event: any) => {
        const { value } = event.target
        this.setState({ blockId: value})
    }

    /**
     * setState the right blockId
     */
    componentDidMount() {
        
    }

    render() {
        const weekDay: number = 1
        const blocks: IBlock[] = this.props.blocks.filter((block: IBlock) => block.weekDay === weekDay)

        return (
            <>
                <Head><title>{makeDocumentTitle('Student Check-in')}</title></Head>
                <TopBar title='Student Check-in' />
                <Section>
                    <CalendarHeader
                        date={this.state.date}
                        nextLabel='Next day'
                        previousLabel='Previous day'
                        onChange={this.handleChangeDate}
                        onNext={this.handleNext}
                        onPrevious={this.handlePrevious}
                        days={1}
                        includeDay
                    />
                    <FormControl variant='outlined' margin='dense'>
                        <InputLabel id='check-in-block-label'>Block</InputLabel>
                        <Select
                            labelId='check-in-block-label'
                            variant='outlined'
                            value={this.state.blockId}
                            onChange={this.handleSelectBlock}
                            label='Block'
                        >
                            {blocks.map((block: IBlock) => (
                                <MenuItem value={block.id}>{block.label}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Section>
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    blocks: state.blocks.items
})

const mapDispatchToProps = { fetchBlocks }

export default withAuth('teacher')(connect(mapStateToProps, mapDispatchToProps)(CheckIn))