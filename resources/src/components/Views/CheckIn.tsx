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

import { fetchCheckInStatus } from '../../actions/checkinActions'
import { LoadingButton } from '../Form/LoadingButton'
import { ISelectableListItem, ISelectableListAction, SelectableList } from '../SelectableList'
import CheckInForm from '../Form/CheckInForm'
import { TopNav } from '../TopNav'
import { CheckInStatus } from '../../types/checkin'
import { ModalSection } from '../ModalSection'

interface ReduxProps {
    checkInStatus: CheckInStatus
    fetchCheckInStatus: (dateTime?: string) => Promise<any>
}

interface IProps extends ReduxProps {}

interface IState {
    date: Date
    datePickerOpen: boolean
    loadingStatus: boolean
}

class CheckIn extends React.Component<IProps, IState> {
    state: IState = {
        date: new Date(),
        datePickerOpen: false,
        loadingStatus: false
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
        this.props.fetchCheckInStatus(this.state.date.toISOString())
    }
    
    fetchPrevious = () => {}
    fetchNext = () => {}
    fetchToday = () => {}

    itemCallback = (selected: (string | number)[]): Promise<any> => {
        return new Promise((resolve, reject) => {
            resolve()
        })
    }

    componentDidMount() {
        this.setState({ loadingStatus: true })
        this.props.fetchCheckInStatus()
            .then(() => {
                this.setState({ loadingStatus: false })
            })
    }

    render() {
        const data: ISelectableListItem[] = [
            { id: 1, label: 'Curtis Upshall' },
            { id: 2, label: 'Vlad Lyesin' },
            { id: 3, label: 'Sam Warren' },
            { id: 4, label: 'Ben Austin' },
        ]
        
        const actions: ISelectableListAction[] = [
            { icon: 'alarm', title: 'Alarm', callback: this.itemCallback }
        ]
        console.log(this.props)
        return (
            <div className='content' id='content'>
                <TopNav breadcrumbs={[{ value: 'Check-in' }]} />
                {this.state.loadingStatus && this.props.checkInStatus ? (
                    <h2>Loading</h2>
                ) : (
                    <>
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
                                    {this.props.checkInStatus.date ? this.props.checkInStatus.date.full_date : 'Select Date'}
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
                            <li>
                                <Button
                                    variant='text'
                                    color='primary'
                                    onClick={() => this.fetchToday()}
                                    disabled={this.props.checkInStatus.date && this.props.checkInStatus.date.is_today}
                                >Today</Button>
                            </li>
                        </ul>
                        <CheckInForm />
                        <ModalSection icon='alarm' title='Scheduled'>
                            <SelectableList
                                title='Some Students'
                                selected={[1, 2, 3, 4]}
                                items={data}
                                actions={actions}
                                onSelectAll={() => null}
                                sortable={true}
                                sortLabel='Name'
                            />
                        </ModalSection>
                    </>
                )}
            </div>
        )
    }
}

const mapStateToProps = (state: any) => ({
    checkInStatus: state.checkin.status
})
const mapDispatchToProps = { fetchCheckInStatus }

export default connect(mapStateToProps, mapDispatchToProps)(CheckIn)
