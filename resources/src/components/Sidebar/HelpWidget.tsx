import * as React from 'react'
import axios from 'axios'

import {
    Menu,
    MenuItem
} from '@material-ui/core'

import { NavItem } from './NavItem'
import FeedbackDialog from '../Modals/FeedbackDialog'

export const HelpWidget = () => {
    const [menuRef, setMenuRef]: [any, React.Dispatch<React.SetStateAction<any>>]
        = React.useState(null)
    const [feedbackDialogOpen, setFeedbackDialogOpen]: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
        = React.useState(false)
    const menuOpen: boolean = Boolean(menuRef)

    const handleMenuOpen = (event: any) => {
        setMenuRef(event.currentTarget)
    }

    const handleMenuClose = () => {
        setMenuRef(null)
    }

    const handleFeedbackDialogOpen = () => {
        handleMenuClose()
        setFeedbackDialogOpen(true)
    }

    const handleFeedbackDialogClose = () => {
        setFeedbackDialogOpen(false)
    }

    return (
        <>
            <NavItem
                icon='help'
                title='Help'
                onClick={handleMenuOpen}
            />
            <Menu
                open={menuOpen}
                anchorEl={menuRef}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={handleFeedbackDialogOpen}>Provide Feedback</MenuItem>
            </Menu>
            <FeedbackDialog open={feedbackDialogOpen} onClose={handleFeedbackDialogClose}/>
        </>
    )
}
