import * as React from 'react'
import { connect } from 'react-redux'

import {
    Dialog,
    Button
} from '@material-ui/core'

import CreatePowerScheduleForm from './Form/CreatePowerScheduleForm'
import { EnhancedDialogTitle } from './Modals/EnhancedDialogTitle'
import { EnhancedTable } from './Table/EnhancedTable'
import { IUser } from '../types/auth'
import { EmptyStateIcon } from './EmptyStateIcon'


interface ReduxProps {
    // currentUser: IUser
}

interface IProps extends ReduxProps {}

interface IState {
    createDialogOpen: boolean
}

class PowerScheduler extends React.Component<IProps, IState> {
    state: IState = {
        createDialogOpen: false
    }

    render() {
        return (
			<div className='content --content-inner' id='content'>
                <Dialog open={true}>
                    <EnhancedDialogTitle title='Create Power Schedule' />
                    <CreatePowerScheduleForm onSubmit={() => null}/>
                </Dialog>
                <EmptyStateIcon variant='flash'>
                    <h2>Your Power Scheduler is empty</h2>
                    <Button variant='contained' color='primary'>Create</Button>
                </EmptyStateIcon>
            </div>
        )
    }
}

export default PowerScheduler
