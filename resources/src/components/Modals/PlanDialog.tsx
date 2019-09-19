import * as React from 'react'
import { connect } from 'react-redux'

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText    
} from '@material-ui/core'

import { CalendarDialogItem } from '../Calendar/CalendarDialogItem'
import { EnhancedDialogTitle } from './EnhancedDialogTitle'
import { fetchStaffList, IStaffTopic } from '../../actions/studentScheduleActions'

interface ReduxProps {
    fetchStaffList: () => Promise<any>
    staffList: IStaffTopic[]
}

interface IProps extends ReduxProps {
    open: boolean
    onClose: () => void
    onSubmit: () => void
}

interface IState {
    loadingStaffList: boolean
}

class PlanDialog extends React.Component<IProps, IState> {
    state: IState = {
        loadingStaffList: false
    }

    componentDidMount() {
        this.setState({ loadingStaffList: true })
        this.props.fetchStaffList()
            .then(() => {
                this.setState({ loadingStaffList: false })
            })
    }

    render() {
        console.log('THIS.PROPS:', this.props)
        return (
            <Dialog open={true}>
                <EnhancedDialogTitle title='Plan Schedule' />
                <DialogContent>
                    <DialogContentText>Select a teacher from the list below.</DialogContentText>
                </DialogContent>
            </Dialog>
        )
    }
}

const mapStateToProps = (state: any) => ({
    staffList: state.staffTopics.items
})

const mapDispatchToProps = { fetchStaffList }

export default connect(mapStateToProps, mapDispatchToProps)(PlanDialog)
