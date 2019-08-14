import * as React from 'react'
import * as classNames from 'classnames'

import {
    Avatar,
    Checkbox,
    CircularProgress,
    Dialog,
    Fade,
    Grow,
    Icon,
    IconButton,
    InputAdornment,
    List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    Switch,
    TextField,
    Tooltip
} from '@material-ui/core'

import { NavItem } from '../Sidebar/NavItem'
import { EnhancedDialogTitle } from './EnhancedDialogTitle'

interface ReduxProps {}

interface IProps extends ReduxProps {}

export const CheckInWidget = (props: IProps) => {
    // useStates
    const [open, setOpen]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = React.useState(true)
    const [airCheckInEnabled, setAirCheckInEnabled]: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
        = React.useState(false)
    const [loadingAirStatus, setLoadingAirStatus]: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
        = React.useState(false)
    const [loadingCheckIn, setLoadingCheckIn]: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
        = React.useState(false)
    const [inputValue, setInputValue]: [string, React.Dispatch<React.SetStateAction<string>>]
        = React.useState('')

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleChange = (event: any) => {
        if (loadingCheckIn) {
            return
        }
        setInputValue(event.target.value)
    }

    const toggleAirCheckIn = () => {
        setAirCheckInEnabled(!airCheckInEnabled)
    }

    const handleSubmit = (event: any) => {
        event.preventDefault()
        setLoadingCheckIn(true)
        
    }

    return (
        <>
            <NavItem
                title='Check-in'
                icon='how_to_reg'
                badgeCount={3}
                onClick={() => handleClickOpen()}
            />
            <Dialog
                open={open}
                onClose={() => handleClose()}
                className='check-in_modal'
                scroll='paper'
            >
                <EnhancedDialogTitle title='Student Check-in' onClose={handleClose} />
                <div className='check-in_modal__content'>
                    <div className='check-in_heading'>
                        <Icon>keyboard</Icon>
                        <h4 className='heading_type'>Scan or Enter</h4>
                    </div>
                    <div className='check-in_data'>
                        <p>Checking in as Mr. Upshall, Curtis for Block 2 on August 8</p>
                        <form className='check-in-input' onSubmit={handleSubmit}>
                            <TextField
                                name='check-in'
                                type='text'
                                placeholder='Enter Student Numbers'
                                variant='outlined'
                                value={inputValue}
                                onChange={handleChange}
                                margin='normal'
                                autoFocus
                                fullWidth
                                helperText='Comma separated list or single entry'
                                InputProps={{
                                    endAdornment: loadingCheckIn ? (
                                        <div><CircularProgress size={24} /></div>
                                    ) : (
                                        <InputAdornment position='end'>
                                            <IconButton disabled={inputValue.length === 0} onClick={handleSubmit}><Icon>keyboard_return</Icon></IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </form>
                    </div>
                    <div className='check-in_heading'>
                        <Icon>wifi</Icon>
                        <h4 className='heading_type'>Air Check-in</h4>
                        <h3 className={classNames('heading_status', {'--online': airCheckInEnabled})}>
                            {airCheckInEnabled ? 'Online' : 'Offline'}
                        </h3>
                        <Switch 
                            checked={airCheckInEnabled}
                            onChange={() => toggleAirCheckIn()}
                            color='primary'
                        />
                        <Grow in={loadingAirStatus}>
                            <CircularProgress color='primary' size={24}/>
                        </Grow>
                    </div>
                    <div className='check-in_data'>
                        <List dense>
                            <ListItem button>
                                <ListItemAvatar><Avatar>CU</Avatar></ListItemAvatar>
                                <span>Curtis Upshall</span>
                                <ListItemSecondaryAction>
                                    <Checkbox color='primary' />
                                </ListItemSecondaryAction>
                            </ListItem>
                            <ListItem button>
                                <ListItemAvatar><Avatar>VL</Avatar></ListItemAvatar>
                                <span>Vlad Lyesin</span>
                                <ListItemSecondaryAction>
                                    <Checkbox color='primary' />
                                </ListItemSecondaryAction>
                            </ListItem>
                        </List>
                    </div>
                </div>
            </Dialog>
        </>
    )
}
