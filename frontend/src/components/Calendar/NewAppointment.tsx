import * as React from 'react'

import {
    Button,
    Icon,
    IconButton,
    TextField,
} from '@material-ui/core'
import { LoadingButton } from '../Form/LoadingButton'

interface IProps {
    onSubmit: (memo: string) => any
    onClose: () => void
}

export const NewAppointment = (props: IProps) => {
    const [open, setOpen]: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
        = React.useState(false)
    const [errored, setErrored]: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
        = React.useState(false)
    const [inputValue, setInputValue]: [string, React.Dispatch<React.SetStateAction<string>>]
        = React.useState('')
    const [loading, setLoading]: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
    = React.useState(false)

    const handleChange = (event: any) => {
        if (loading)
            return
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
        props.onSubmit(inputValue).then(
            (res: any) => {
                handleClose()
            }
        )
    }
    
    return (
        <div className='calendar_appointment_widget'>
            {open ? <>
                <TextField
                    value={inputValue}
                    onChange={handleChange}
                    variant='filled'
                    label='New Appointment'
                    placeholder='Memo'
                    margin='normal'
                    autoFocus
                    fullWidth
                    multiline
                />
                <LoadingButton loading={loading} onClick={() => handleSubmit()} variant='text' color='primary'>Submit</LoadingButton>
                <Button onClick={() => handleClose()} variant='text'>Cancel</Button>
            </> : (
                <div className='calendar_item__container'>
                    <Button variant='text' color='primary' onClick={handleOpen}>Make Appointment</Button>
                </div>
            )}
        </div>
    )
}
