import * as React from 'react'
import { connect } from 'react-redux'
import DateFnsUtils from '@date-io/date-fns'

import {
    Button,
    Checkbox,
    Icon,
    IconButton,
    Tooltip
} from '@material-ui/core'
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers'

import { TopNav } from '../TopNav'

interface ReduxProps {

}

interface IProps extends ReduxProps {}

interface IState {
    date: Date
    datePickerOpen: boolean
}

class CheckIn extends React.Component<IProps, IState> {
    state: IState = {
        date: new Date(),
        datePickerOpen: false
    }

    handleDatePickerOpen = () => {
        this.setState({ datePickerOpen: true })
    }

    handleDatePickerClose = () => {
        this.setState({ datePickerOpen: false })
    }

    handleDatePickerSelect = (date: Date) => {
        this.setState({ date }, () => {
            this.fetchStatus()
        })
    }

    fetchStatus = () => {
        // this.props.fetchStatus(this.state.date)
    }
    
    fetchPrevious = () => {}
    fetchNext = () => {}

    componentDidMount() {

    }

    render() {
        return (
            <div className='content' id='content'>
                <TopNav breadcrumbs={[{ value: 'Check-in' }]} />
                <ul className='calendar_header'>
                    <li>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <DatePicker
                                variant='dialog'
                                open={this.state.datePickerOpen}
                                onClose={this.handleDatePickerClose}
                                value={this.state.date}
                                onChange={this.handleDatePickerSelect}
                                TextFieldComponent={() => null}
                            />
                        </MuiPickersUtilsProvider>
                        <Button onClick={() => this.handleDatePickerOpen()}>
                            {'Select Date'}
                        </Button>
                    </li>
                    <li>
                        <Tooltip title='Back' placement='top'>
                            <IconButton onClick={() => this.fetchPrevious()}>
                                <Icon>chevron_left</Icon>
                            </IconButton>
                        </Tooltip>
                    </li>
                    <li>
                        <Tooltip title='Next' placement='top'>
                            <IconButton onClick={() => this.fetchNext()}>
                                <Icon>chevron_right</Icon>
                            </IconButton>
                        </Tooltip>
                    </li>
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state: any) => ({

})
const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(CheckIn)
