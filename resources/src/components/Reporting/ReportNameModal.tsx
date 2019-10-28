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
    name?: string
    onClose: () => void
    onSubmit: (name: string) => void
}

const ReportNameModal = (props: IProps) => {
    const [name, setName]: [string, SetState<string>] = React.useState(null)
    const [error, setError]: [string, SetState<string>] = React.useState(null)

    const handleSubmit = () => {
        // Validate input
        const nameLength: number = name ? name.length : props.name.length || 0
        if (nameLength < 3)
            setError('Please choose a name that is at least 3 characters long.')
        else
            props.onSubmit(name || props.name)
    }

    const onChange = (event: any) => {
        setName(event.target.value)
        setError(null)
    }

    const onExited = () => {
        setName(null)
        setError(null)
    }

    return (
        <Dialog open={props.open} onExited={onExited}>
            <DialogTitle>Report Name</DialogTitle>
            <DialogContent>
                <DialogContentText>Choose a name to give to the Report.</DialogContentText>
                <TextField
                    onChange={onChange}
                    value={name || props.name}
                    label='Report Name'
                    placeholder='My Report'
                    variant='outlined'
                    fullWidth
                    error={!!error}
                    helperText={error || undefined}
                />
            </DialogContent>
            <DialogActions>
                <Button variant='text' onClick={() => props.onClose()}>Cancel</Button>
                <Button variant='text' color='primary' onClick={() => handleSubmit()}>Submit</Button>
            </DialogActions>
        </Dialog>
    )
}

export { ReportNameModal }
