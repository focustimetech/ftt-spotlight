import * as React from 'react'
import { connect } from 'react-redux'
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

interface IState {
    open: boolean
    airCheckInEnabled: boolean
    loadingAirStatus: boolean
    loadingCheckIn: boolean
    inputValue: string
}

class CheckInWidget extends React.Component<IProps, IState> {
    state: IState = {
        open: true, // Change this to false
        airCheckInEnabled: false,
        loadingAirStatus: false,
        loadingCheckIn: false,
        inputValue: ''
    }

    handleClickOpen = () => {
        this.setState({ open: true })
    }

    handleClose = () => {
        this.setState({ open: false })
    }

    handleChange = (event: any) => {
        if (this.state.loadingCheckIn) {
            return
        }
        this.setState({ loadingCheckIn: event.target.value })
    }

    toggleAirCheckIn = () => {
        this.setState({ airCheckInEnabled: !this.state.airCheckInEnabled })
    }

    handleSubmit = (event: any) => {
        event.preventDefault()
        this.setState({ loadingCheckIn: true })
        
    }

    render() {
        return (
            <>
                <NavItem
                    title='Check-in'
                    icon='how_to_reg'
                    badgeCount={3}
                    onClick={() => this.handleClickOpen()}
                />
                <Dialog
                    open={this.state.open}
                    onClose={() => this.handleClose()}
                    className='check-in_modal'
                    scroll='paper'
                >
                    <EnhancedDialogTitle title='Student Check-in' onClose={this.handleClose} />
                    <div className='check-in_modal__content'>
                        <div className='check-in_heading'>
                            <Icon>keyboard</Icon>
                            <h4 className='heading_type'>Scan or Enter</h4>
                        </div>
                        <div className='check-in_data'>
                            <p>Checking in as Mr. Upshall, Curtis for Block 2 on August 8</p>
                            <form className='check-in-input' onSubmit={this.handleSubmit}>
                                <TextField
                                    name='check-in'
                                    type='text'
                                    placeholder='Enter Student Numbers'
                                    variant='outlined'
                                    value={this.state.inputValue}
                                    onChange={this.handleChange}
                                    margin='normal'
                                    autoFocus
                                    fullWidth
                                    helperText='Comma separated list or single entry'
                                    InputProps={{
                                        endAdornment: this.state.loadingCheckIn ? (
                                            <div><CircularProgress size={24} /></div>
                                        ) : (
                                            <InputAdornment position='end'>
                                                <IconButton disabled={this.state.inputValue.length === 0} onClick={this.handleSubmit}>
                                                    <Icon>keyboard_return</Icon>
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </form>
                        </div>
                        <div className='check-in_heading'>
                            <Icon>wifi</Icon>
                            <h4 className='heading_type'>Air Check-in</h4>
                            <h3 className={classNames('heading_status', {'--online': this.state.airCheckInEnabled})}>
                                {this.state.airCheckInEnabled ? 'Online' : 'Offline'}
                            </h3>
                            <Switch 
                                checked={this.state.airCheckInEnabled}
                                onChange={() => this.toggleAirCheckIn()}
                                color='primary'
                            />
                            <Grow in={this.state.loadingAirStatus}>
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
}

export default CheckInWidget
