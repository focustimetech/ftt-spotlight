import * as React from 'react'

import {
    Button,
    Icon,
    IconButton,
    TextField,
} from '@material-ui/core'

interface IProps {
    onSubmit: (memo: string) => void
}

export const CalendarAppointmentWidget = (props: IProps) => {
    const [open, setOpen]: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
        = React.useState(false)
    const [inputValue, setInputValue]: [string, React.Dispatch<React.SetStateAction<string>>]
        = React.useState('')

    const handleChange = (event: any) => {
        setInputValue(event.target.value)
    }

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setInputValue('')
        setOpen(false)
    }

    const handleSubmit = () => {
        props.onSubmit(inputValue)
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
                <Button onClick={() => handleSubmit()} variant='text' color='primary'>Submit</Button>
                <Button onClick={() => handleClose()} variant='text'>Cancel</Button>
            </> : (
                <div className='calendar_item__container'>
                    <Button variant='text' color='primary' onClick={handleOpen}>Make Appointment</Button>
                </div>
            )}
        </div>
    )
}
