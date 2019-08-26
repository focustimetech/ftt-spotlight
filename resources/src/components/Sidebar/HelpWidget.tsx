import * as React from 'react'

import {
    Button,
    Checkbox,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    FormControlLabel,
    Menu,
    MenuItem,
    TextField,
} from '@material-ui/core'

import { NavItem } from './NavItem'
import { EnhancedDialogTitle } from '../Modals/EnhancedDialogTitle'

interface IChip {
    label: string,
    value: string
}

const chips: IChip[] = [
    { label: 'Unexpected Behavior', value: 'unexpected-behavior' },
    { label: 'Confusing Feature', value: 'confusing-feature' },
    { label: 'Missing Feature', value: 'missing-feature' },
    { label: 'Permissions', value: 'permissions' },
    { label: 'Connectivity', value: 'connectivity' },
    { label: 'Other', value: 'other' }
]

export const HelpWidget = () => {
    const [menuRef, setMenuRef]: [any, React.Dispatch<React.SetStateAction<any>>]
        = React.useState(null)
    const [dialogOpen, setDialogOpen]: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
        = React.useState(false)
    const [inputValue, setInputValue]: [string, React.Dispatch<React.SetStateAction<string>>]
        = React.useState('')
    const [selectedChips, setSelectedChips]: [string[], React.Dispatch<React.SetStateAction<string[]>>]
        = React.useState([])
    const [allowReply, setAllowReply]: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
    = React.useState(true)
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

    const handleSelectChip = (value: string) => {
        setSelectedChips([...selectedChips, value])
    }

    const handleDeselectChip = (value: string) => {
        setSelectedChips(selectedChips.filter((chipValue: string) => chipValue !== value))
    }

    const toggleChecked = () => {
        setAllowReply(!allowReply)
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
                    <DialogContentText>We take feedback seriously to ensure Spotlight meets your school's needs.</DialogContentText>
                    <div className='chips_container'>
                        {chips.map((chip: IChip) => {
                            const selected: boolean = selectedChips.includes(chip.value)
                            return (
                                <Chip
                                    onClick={() => {selected ? handleDeselectChip(chip.value) : handleSelectChip(chip.value)}}
                                    variant={selected ? 'default' : 'outlined'}
                                    label={chip.label}
                                />
                            )
                        })}
                    </div>
                    <TextField
                        value={inputValue}
                        onChange={handleInputChange}
                        placeholder='Describe your issue or idea'
                        label='Feedback'
                        variant='filled'
                        fullWidth
                        autoFocus
                        multiline
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={allowReply}
                                onChange={() => toggleChecked()}
                                color='primary'
                            />
                        }
                        label='Allow Spotlight to contacted me in response to my feedback'
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
