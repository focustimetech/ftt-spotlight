import * as React from 'react'

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@material-ui/core'

import { IAppointment } from '../../types/calendar'
import { LoadingButton } from '../Form/LoadingButton'

interface IProps {
    appointment: IAppointment
    open: boolean
    onSubmit: (appointment: IAppointment) => Promise<any>
    onClose: () => void
}

export const CancelAppointment = (props: IProps) => {
    const [loading, setLoading]: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
        = React.useState(false)

    const handleSubmit = () => {
        setLoading(true)
        props.onSubmit(props.appointment)
            .then((res: any) => {
                setLoading(false)
                props.onClose()
            })
            .catch((error: any) => {
                setLoading(false)
            })
    }

    return (
        <Dialog open={props.open}>
            <DialogTitle>Delete Appointment</DialogTitle>
            <DialogContent>
                {props.appointment ? <>
                    <DialogContentText>The following appointment will be deleted:</DialogContentText>
                    <div className='calendar_item'>
                        <div>
                            <h6 className='calendar_item__title'>
                                {props.appointment.staff.name}
                            </h6>
                            <p className='calendar__memo'>{props.appointment.memo}</p>
                        </div>
                    </div>
                </> : (
                    <DialogContentText>Are you sure you want to delete the appointment?</DialogContentText>
                )}
            </DialogContent>
            <DialogActions>
                <LoadingButton loading={loading} variant='text' color='primary' onClick={() => handleSubmit()}>Confirm</LoadingButton>
                <Button variant='text' onClick={() => props.onClose()}>Cancel</Button>
            </DialogActions>
        </Dialog>
    )
}
