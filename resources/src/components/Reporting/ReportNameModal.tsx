import * as React from 'react'

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField
} from '@material-ui/core'

import { SetState } from '../../types/app'

interface IProps {
    open: boolean
    onClose: () => void
    onSubmit: (name: string) => void
}

const ReportUnsavedModal = (props: IProps) => {
    const [name, setName] = React.useState('')
    const [error, setError]: [string, SetState<string>] = React.useState(null)

    const handleSubmit = () => {
        // Validate input
        if (name.length < 3)
            setError('Please choose a name that is at least 3 characters long.')
        else
            props.onSubmit(name)
    }

    const onChange = (event: any) => {
        setName(event.target.value)
        setError(null)
    }

    const onExited = () => {
        setName('')
        setError(null)
    }

    return (
        <Dialog open={props.open} onExited={onExited}>
            <DialogTitle>Report Name</DialogTitle>
            <DialogContent>
                <DialogContentText>Choose a name to give to the Report.</DialogContentText>
                <TextField
                    onChange={onChange}
                    value={name}
                    label='Report Name'
                    placeholder='My Report'
                    variant='filled'
                    error={!!error}
                    helperText={error || undefined}
                />
                <DialogActions>
                    <Button variant='text' color='primary' onClick={() => handleSubmit()}>Submit</Button>
                    <Button variant='text' onClick={() => props.onClose()}>Cancel</Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    )
}

export { ReportUnsavedModal }
