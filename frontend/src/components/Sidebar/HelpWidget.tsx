import * as React from 'react'

import {
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    FormControlLabel,
    Menu,
    MenuItem,
    TextField
} from '@material-ui/core'

import { NavItem } from './NavItem'
import { EnhancedDialogTitle } from '../Modals/EnhancedDialogTitle'

export const HelpWidget = () => {
    const [menuRef, setMenuRef]: [any, React.Dispatch<React.SetStateAction<any>>]
        = React.useState(null)
    const [dialogOpen, setDialogOpen]: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
        = React.useState(false)
    const [inputValue, setInputValue]: [string, React.Dispatch<React.SetStateAction<string>>]
        = React.useState('')
    const menuOpen: boolean = Boolean(menuRef)

    const handleInputChange = (event: any) => {
        setInputValue(event.target.value)
    }

    const handleOpen = (event: any) => {
        setMenuRef(event.currentTarget)
    }

    const handleClose = () => {
        setMenuRef(null)
    }

    const handleDialogOpen = () => {
        handleClose()
        setDialogOpen(true)
    }

    const handleDialogClose = () => {
        setDialogOpen(false)
    }

    const handleSubmit = (event: any) => {}

    return (
        <>
            <NavItem
                icon='help'
                title='Help'
                onClick={handleOpen}
            />
            <Menu
                open={menuOpen}
                anchorEl={menuRef}
                onClose={handleClose}
            >
                <MenuItem onClick={handleDialogOpen}>Provide Feedback</MenuItem>
            </Menu>
            <Dialog open={dialogOpen}>
                <EnhancedDialogTitle title='Provide Feedback' onClose={handleDialogClose}/>
                <DialogContent>
                    <TextField
                        value={inputValue}
                        onChange={handleInputChange}
                        variant='filled'
                        fullWidth
                        autoFocus
                        multiline
                        placeholder='Describe your issue or idea'
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={true}
                                onChange={() => {}}
                                color='primary'
                            />
                        }
                        label='I may be contacted in response to my feedback'
                    />
                </DialogContent>
                <DialogActions>
                    <Button variant='text' onClick={() => handleDialogClose()}>Cancel</Button>
                    <Button variant='contained' color='primary' onClick={handleSubmit}>Send</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}