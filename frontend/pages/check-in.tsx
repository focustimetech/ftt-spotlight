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
import TopBar from '../components/TopBar'

interface IReduxProps {
    queueSnackbar: (snackbar: ISnackbar) => void
}

interface ICheckInState {
    date: Date
    datePickerOpen: boolean
    errorsDialogOpen: boolean
    loadingStatus: boolean
    preventNavigation: boolean
    refreshing: boolean
    scheduledSelected: number[]
}

class CheckIn extends React.Component<IReduxProps, ICheckInState> {
    state: ICheckInState = {
        date: new Date(),
        datePickerOpen: false,
        errorsDialogOpen: false,
        loadingStatus: false,
        preventNavigation: false,
        refreshing: false,
        scheduledSelected: []
    }

    render() {
        return (
            <>
                <TopBar title='Student Check-in' />
            </>
        )
    }
}

export default withAuth('teacher')(CheckIn)