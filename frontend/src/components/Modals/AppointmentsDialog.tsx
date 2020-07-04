import React from 'react'

import Dialog, { DialogProps } from '@material-ui/core/Dialog'

import AppointmentsForm, { IAppointmentsFormProps } from '../Form/Forms/AppointmentsForm'

const AppointmentsDialog = (props: DialogProps & IAppointmentsFormProps) => {
    const { open, onClose, event, date } = props
    return (
        <Dialog open={open} onClose={onClose}>
            <AppointmentsForm event={event} date={date} />
        </Dialog>
    )
}

export default AppointmentsDialog
