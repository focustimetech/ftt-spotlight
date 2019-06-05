import * as React from 'react'

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    ExpansionPanel,
    TextField
} from '@material-ui/core'

import { EnhancedDialogTitle } from './EnhancedDialogTitle'

interface IProps {
    open: boolean
}

interface IState {}

export class EditStudentDialog extends React.Component<IProps, IState> {
    render() {
        return (
            <Dialog open={this.props.open}></Dialog>
        )
    }
}