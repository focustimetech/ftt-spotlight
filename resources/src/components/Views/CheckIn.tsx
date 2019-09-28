import * as React from 'react'
import { connect } from 'react-redux'
import ContentLoader from 'react-content-loader'
import DateFnsUtils from '@date-io/date-fns'

import {
    Button,
    Icon,
    IconButton,
    Tooltip,
    Typography
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
        this.fetchStatus(date.toISOString())
    }

    fetchStatus = (dateTime?: string) => {
        this.setState({ loadingStatus: true })
        this.props.fetchCheckInStatus(dateTime)
            .then(() => {
                this.setState({ loadingStatus: false })
            })
    }
    
    fetchPrevious = () => {
        this.fetchStatus(this.props.checkInStatus.previous)
    }

    fetchNext = () => {
        this.fetchStatus(this.props.checkInStatus.next)
    }

    fetchToday = () => {
        this.fetchStatus(this.props.checkInStatus.today)
    }

    itemCallback = (selected: (string | number)[]): Promise<any> => {
        return new Promise((resolve, reject) => {
            resolve()
        })
    }

    componentDidMount() {
        this.fetchStatus()
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

        const CheckInLoader = () => (
            <>
                <div style={{width: 476, height: 558}}>
                    <ContentLoader width={476} height={558}>
                        <rect x={0} y={14} rx={4} ry={4} width={120} height={24} />
                        <rect x={136} y={8} rx={36} ry={36} width={36} height={36} />
                        <rect x={180} y={8} rx={36} ry={36} width={36} height={36} />
                        <rect x={232} y={14} rx={4} ry={4} width={72} height={24} />
                        <rect x={0} y={64} rx={4} ry={4} width={108} height={24} />
                        <rect x={24} y={112} rx={16} ry={16} width={450} height={32} />
                        <rect x={0} y={172} rx={4} ry={4} width={132} height={24} />
                        <rect x={24} y={212} rx={4} ry={4} width={24} height={24} />
                        <rect x={64} y={216} rx={4} ry={4} width={96} height={16} />
                        <rect x={24} y={260} rx={4} ry={4} width={24} height={24} />
                        <rect x={64} y={264} rx={4} ry={4} width={108} height={16} />
                        <rect x={24} y={292} rx={4} ry={4} width={24} height={24} />
                        <rect x={64} y={296} rx={4} ry={4} width={124} height={16} />
                        <rect x={24} y={324} rx={4} ry={4} width={24} height={24} />
                        <rect x={64} y={328} rx={4} ry={4} width={64} height={16} />
                        <rect x={0} y={376} rx={4} ry={4} width={92} height={24} />
                        <rect x={24} y={416} rx={4} ry={4} width={24} height={24} />
                        <rect x={64} y={420} rx={4} ry={4} width={120} height={16} />
                        <rect x={24} y={464} rx={4} ry={4} width={24} height={24} />
                        <rect x={64} y={468} rx={4} ry={4} width={136} height={16} />
                        <rect x={24} y={496} rx={4} ry={4} width={24} height={24} />
                        <rect x={64} y={500} rx={4} ry={4} width={64} height={16} />
                        <rect x={24} y={538} rx={4} ry={4} width={24} height={24} />
                        <rect x={64} y={542} rx={4} ry={4} width={108} height={16} />
                    </ContentLoader>
                </div>
            </>
        )

        return (
            <div className='content' id='content'>
                <TopNav breadcrumbs={[{ value: 'Check-in' }]} />
                {(this.state.loadingStatus && this.props.checkInStatus) ? (
                    <CheckInLoader />
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
                                    <Typography variant='button' color={this.props.checkInStatus.date.is_today ? 'inherit' : 'error'}>
                                        {this.props.checkInStatus.date ? (
                                            `${this.props.checkInStatus.date.day} ${this.props.checkInStatus.date.full_date}`
                                        ) : 'Select Date'}
                                    </Typography>
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
                        <CheckInForm dateTime={this.props.checkInStatus.date.full_date} />
                        <ModalSection
                            icon='alarm'
                            title='Scheduled'
                            emptyState={<Typography variant='h6'>No students scheduled.</Typography>}
                        >
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
