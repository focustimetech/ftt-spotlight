import * as React from 'react'

import * as classNames from 'classnames'

import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import CircularProgress from '@material-ui/core/CircularProgress'
import Dialog from '@material-ui/core/Dialog'
import Grow from '@material-ui/core/Grow'
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import InputAdornment from '@material-ui/core/InputAdornment'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Snackbar from '@material-ui/core/Snackbar'
import Switch from '@material-ui/core/Switch'
import TextField from '@material-ui/core/TextField'

import { NavItem } from '../Sidebar/NavItem'

type AirCheckInStatus = 'on' | 'off' | 'loading'

interface AirCheckIn {
    name: string
    day: string
    time: string
}

interface IState {
    open: boolean
    airCheckInStatus: AirCheckInStatus
    checkInValue: string
}

export class CheckInWidget extends React.Component<{}, IState> {
    state = {
        open: false,
        airCheckInStatus: 'off' as AirCheckInStatus,
        checkInValue: ''
    }

    handleClickOpen = () => {
        this.setState({ open: true })
    }

    handleClose = () => {
        this.setState({ open: false })
    }

    handleChange = (event: any) => {
        this.setState({ checkInValue: event.target.value})
    }

    toggleAirCheckIn = () => {
        switch (this.state.airCheckInStatus) {
            case 'on': {
                this.setState({ airCheckInStatus: 'loading' }, () => {
                    setTimeout(() => {
                        this.setState({ airCheckInStatus: 'off' })
                    }, 500)
                })
                return
            }
            case 'off': {
                this.setState({ airCheckInStatus: 'loading' }, () => {
                    setTimeout(() => {
                        this.setState({ airCheckInStatus: 'on' })
                    }, 500)
                })
                return
            }
            default:
                return
        }
    }

    render() {
        return (
            <>
                <NavItem
                    title='Check-in'
                    icon='how_to_reg'
                    badgeCount={3}
                    onClick={this.handleClickOpen}
                />
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    className='check-in_modal'
                    scroll='paper'
                >
                    <div className='check-in_modal__header'>
                        <h3>Student Check-in</h3>
                        <IconButton className='icon-close' onClick={this.handleClose}><Icon>close</Icon></IconButton>
                    </div>
                    <div className='check-in_modal__content'>
                        <div className='check-in_heading'>
                            <Icon>alarm</Icon>
                            <h4 className='heading_type'>Scan or Enter</h4>
                        </div>
                        <div className='check-in-input'>
                            <TextField
                                name='check-in'
                                type='text'
                                placeholder='Enter Student Numbers'
                                variant='outlined'
                                value={this.state.checkInValue}
                                onChange={this.handleChange}
                                margin='normal'
                                autoFocus={true}
                                fullWidth={true}
                                helperText='Comma separated list or single entry'
                            />
                        </div>
                        <div className='check-in_heading'>
                                <Icon>wifi</Icon>
                                <h4 className='heading_type'>Air Check-in</h4>
                                <h3 className={classNames(
                                    'heading_status',
                                    { '--online': this.state.airCheckInStatus === 'on'}
                                )}>{this.state.airCheckInStatus === 'on' ? 'Online' : 'Offline'}</h3>
                                <Switch 
                                    checked={this.state.airCheckInStatus === 'on'}
                                    onChange={this.toggleAirCheckIn}
                                    color='primary'
                                />
                                <Grow in={this.state.airCheckInStatus === 'loading'}>
                                    <CircularProgress color='primary' />
                                </Grow>
                            </div>
                        <List dense className='air-check-ins'>
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
                </Dialog>
            </>
        )
    }
}