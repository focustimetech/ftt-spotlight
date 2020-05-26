import { addDays, subDays } from 'date-fns'
import classNames from 'classnames'
import React from 'react'
import { connect } from 'react-redux'

import {
    Avatar,
    Button,
    Icon,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    MenuItem,
    TextField,
    Tooltip,
    Typography
} from '@material-ui/core'
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'

import { ISnackbar, queueSnackbar } from '../actions/snackbarActions'

import withAuth from '../hocs/withAuth'
import CalendarHeader from '../components/Calendar/CalendarHeader'
import Section from '../components/Layout/Section'
import TopBar from '../components/TopBar'

interface IReduxProps {
    queueSnackbar: (snackbar: ISnackbar) => void
}

interface ICheckInState {
    date: Date
}

class CheckIn extends React.Component<IReduxProps, ICheckInState> {
    state: ICheckInState = {
        date: new Date(),
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

    render() {
        return (
            <>
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
                </Section>
            </>
        )
    }
}

export default withAuth('teacher')(CheckIn)