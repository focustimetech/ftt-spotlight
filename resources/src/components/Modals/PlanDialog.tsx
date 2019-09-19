import * as React from 'react'
import { connect } from 'react-redux'

import {
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,    
} from '@material-ui/core'

import { LoadingButton } from '../Form/LoadingButton'
import { CalendarDialogItem } from '../Calendar/CalendarDialogItem'
import { EnhancedDialogTitle } from './EnhancedDialogTitle'
import {
    fetchStaffList,
    setStudentPlan,
    IStaffTopic,
    ISchedulePlanRequest
} from '../../actions/studentScheduleActions'
import { IBlockDetails } from '../../types/calendar'

interface ReduxProps {
    fetchStaffList: (blockID: number, dateTime: string) => Promise<any>
    setStudentPlan: (schedulePlan: ISchedulePlanRequest) => Promise<any>
    staffList: IStaffTopic[]
}

interface IProps extends ReduxProps {
    blockDetails: IBlockDetails
    //onClose: () => void  // check aroud where itemMap is done
    onSubmit: () => Promise<any>
}

interface IState {
    loadingStaffList: boolean
    open: boolean
    uploading: boolean
}

class PlanDialog extends React.Component<IProps, IState> {
    state: IState = {
        loadingStaffList: false,
        open: false,
        uploading: false
    }

    handleOpen = () => {
        this.setState({ open: true })
    }

    handleClose = () => {
        this.setState({ open: false })
    }

    handleSubmit = (staffTopic: IStaffTopic) => {
        this.setState({
            open: false,
            uploading: true
        })
        const schedulePlan: ISchedulePlanRequest = {
            staff_id: staffTopic.staff.id,
            block_id: this.props.blockDetails.block_id,
            date: this.props.blockDetails.date
        }
        this.props.setStudentPlan(schedulePlan)
            .then(() => {
                // Signal to refresh profile
                return this.props.onSubmit()
                    .then(() => {
                        // this.props.onClose()
                        this.setState({
                            uploading: false
                        })
                    })
            })        
    }

    componentDidMount() {
        const { block_id, date } = this.props.blockDetails
        this.setState({ loadingStaffList: true })
        this.props.fetchStaffList(block_id, date)
            .then(() => {
                this.setState({ loadingStaffList: false })
            })
    }

    render() {
        return (
            <>
                <LoadingButton
                    loading={this.state.uploading}
                    variant='text'
                    color='primary'
                    onClick={() => this.handleOpen()}
                >Set Plan</LoadingButton>
                <Dialog open={this.state.open}>
                    <EnhancedDialogTitle title='Plan Schedule' onClose={this.handleClose}/>
                    <DialogContent>
                        <DialogContentText>Select a teacher from the list below.</DialogContentText>
                        {this.state.loadingStaffList ? (
                            <CircularProgress />
                        ) : (
                            this.props.staffList.map((staffTopic: IStaffTopic) => (
                                <CalendarDialogItem
                                    onCloseDialog={this.handleClose}
                                    onClick={() => this.handleSubmit(staffTopic)}
                                    details={{
                                        variant: staffTopic.topic ? staffTopic.topic.color : undefined,
                                        title: staffTopic.staff.name,
                                        memo: staffTopic.topic ? staffTopic.topic.memo : 'No Topic'
                                    }}
                                />
                            ))
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button variant='text' onClick={() => this.handleClose()}>Cancel</Button>
                    </DialogActions>
                </Dialog>
            </>
        )
    }
}

const mapStateToProps = (state: any) => ({
    staffList: state.staffTopics.items
})

const mapDispatchToProps = { fetchStaffList, setStudentPlan }

export default connect(mapStateToProps, mapDispatchToProps)(PlanDialog)
