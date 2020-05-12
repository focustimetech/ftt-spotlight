import React from 'react'
import { Link } from 'react-router-dom'

import {
    Menu,
    MenuItem
} from '@material-ui/core'

import { Orientation } from '../../../types/layout'

import { AboutSpotlight } from '../../Modals/AboutSpotlight'
import FeedbackDialog from '../../Modals/FeedbackDialog'
import NavItem from '../NavItem'

interface IHelpWidgetProps {
    orientation: Orientation
}

const HelpWidget = (props: IHelpWidgetProps) => {
    const [menuRef, setMenuRef]: [any, React.Dispatch<React.SetStateAction<any>>]
        = React.useState(null)
    const [feedbackDialogOpen, setFeedbackDialogOpen]: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
        = React.useState(false)
    const [aboutDialogOpen, setAboutDialogOpen]: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
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

    const handleAboutDialogOpen = () => {
        handleMenuClose()
        setAboutDialogOpen(true)
    }

    return (
        <>
            <NavItem
                icon='help'
                title='Help'
                onClick={handleMenuOpen}
                orientation={props.orientation}
            />
            <Menu
                open={menuOpen}
                anchorEl={menuRef}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={handleFeedbackDialogOpen}>Provide Feedback</MenuItem>
                <MenuItem onClick={handleAboutDialogOpen}>About Spotlight</MenuItem>
                <Link to='/wiki'><MenuItem>Spotlight Wiki</MenuItem></Link>
            </Menu>
            <FeedbackDialog open={feedbackDialogOpen} onClose={() => setFeedbackDialogOpen(false)}/>
            <AboutSpotlight open={aboutDialogOpen} onClose={() => setAboutDialogOpen(false)} />
        </>
    )
}

export default HelpWidget
