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

import { CalendarDialogItem } from '../Calendar/CalendarDialogItem'
import { EnhancedDialogTitle } from './EnhancedDialogTitle'
import { fetchStaffList, IStaffTopic } from '../../actions/studentScheduleActions'
import { IBlockDetails } from '../../types/calendar'

interface ReduxProps {
    fetchStaffList: (blockID: number, dateTime: string) => Promise<any>
    staffList: IStaffTopic[]
}

interface IProps extends ReduxProps {
    blockDetails: IBlockDetails
}

interface IState {
    loadingStaffList: boolean
    open: boolean
}

class PlanDialog extends React.Component<IProps, IState> {
    state: IState = {
        loadingStaffList: false,
        open: false,
    }

    handleOpen = () => {
        this.setState({ open: true })
    }

    handleClose = () => {
        this.setState({ open: false })
    }

    handleSubmit = () => {
        // this.props.setPlan(...).then(() => ...)
        // this.props.onSubmit()
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
                <Button
                    variant='text'
                    color='primary'
                    onClick={() => this.handleOpen()}
                >Set Plan</Button>
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

const mapDispatchToProps = { fetchStaffList }

export default connect(mapStateToProps, mapDispatchToProps)(PlanDialog)
