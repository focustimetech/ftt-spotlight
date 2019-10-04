import * as React from 'react'

import {
    Dialog,
} from '@material-ui/core'

import CheckInForm from './CheckInForm'
import { NavItem } from '../Sidebar/NavItem'
import { EnhancedDialogTitle } from '../Modals/EnhancedDialogTitle'

export const CheckInWidget = () => {
    const [open, setOpen] = React.useState(false)

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <>
            <NavItem
                title='Check-in'
                icon='how_to_reg'
                badgeCount={0}
                onClick={() => handleOpen()}
            />
            <Dialog
                open={open}
                onClose={handleClose}
                className='check-in_modal'
                scroll='paper'
            >
                <EnhancedDialogTitle title='Student Check-in' onClose={handleClose} />
                <div className='check-in_modal__content'>
                    <CheckInForm />
                </div>
            </Dialog>
        </>
    )
}
