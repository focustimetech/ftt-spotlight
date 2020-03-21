import React from 'react'

import {
    Button,
    Checkbox,
    FormControlLabel,
    Icon,
    TextField,
    Tooltip,
    Typography
} from '@material-ui/core'

import { SetState } from '../../types/app'
import { LoadingButton } from '../Form/LoadingButton'

export interface ICreateAppointment {
    memo: string
    clearSchedule: boolean
}

interface IProps {
    onSubmit: (NewAppointment: ICreateAppointment) => any
    onClose: () => void
}

export const NewAppointment = (props: IProps) => {
    const [open, setOpen]: [boolean, SetState<boolean>] = React.useState(false)
    const [errored, setErrored]: [boolean, SetState<boolean>] = React.useState(false)
    const [inputValue, setInputValue]: [string, SetState<string>] = React.useState('')
    const [loading, setLoading]: [boolean, SetState<boolean>] = React.useState(false)
    const [clearSchedule, setClearSchedule]: [boolean, SetState<boolean>] = React.useState(false)

    const handleChange = (event: any) => {
        if (loading) {
            return
        }
        setInputValue(event.target.value)
        setErrored(false)
    }

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setInputValue('')
        setOpen(false)
        setLoading(false)
        setErrored(false)
        props.onClose()
    }

    const handleSubmit = () => {
        setLoading(true)
        setErrored(false)
        const appointment: ICreateAppointment = {
            memo: inputValue,
            clearSchedule
        }
        props.onSubmit(appointment).then(
            (res: any) => {
                handleClose()
            }
        ).catch(
            (error: any) => {
                setErrored(true)
                setLoading(false)
            }
        )
    }

    return (
        <div className='calendar_widget'>
            {open ? <>
                <TextField
                    value={inputValue}
                    onChange={handleChange}
                    variant='filled'
                    label='New Appointment'
                    placeholder='Memo'
                    margin='normal'
                    helperText={errored ? 'Please try that again.' : undefined}
                    error={errored}
                    autoFocus
                    fullWidth
                    multiline
                />
                <FormControlLabel
                    label={
                        <div className='info_tooltip'>
                            <Typography>Clear schedule</Typography>
                            <Tooltip title="Student's schedule will be cleared for the Appointment.">
                                <Icon>help</Icon>
                            </Tooltip>
                        </div>
                    }
                    control={
                        <Checkbox
                            checked={clearSchedule}
                            onChange={() => setClearSchedule(!clearSchedule)}
                            color='primary'
                        />
                    }
                />
                <div className='calendar_widget__actions'>
                    <LoadingButton
                        loading={loading}
                        onClick={() => handleSubmit()}
                        variant='text' color='primary'
                    >Submit</LoadingButton>
                    <Button onClick={() => handleClose()} variant='text'>Cancel</Button>
                </div>
            </> : (
                <div className='calendar_item__container'>
                    <Button variant='text' color='primary' onClick={handleOpen}>Make Appointment</Button>
                </div>
            )}
        </div>
    )
}
