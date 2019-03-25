import * as React from 'react'

import CircularProgress from '@material-ui/core/CircularProgress'
import Dialog from '@material-ui/core/Dialog'
import Grow from '@material-ui/core/Grow'
import Switch from '@material-ui/core/Switch'
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'

import { NavItem } from '../Sidebar/NavItem'

type AirCheckInStatus = 'on' | 'off' | 'enabling' | 'disabling' | 'disabled'

interface AirCheckIn {
    name: string
    day: string
    time: string
}

interface IState {
    open: boolean
    airCheckInStatus: AirCheckInStatus
    airCheckIns: AirCheckIn[]
}

export class CheckInWidget extends React.Component<{}, IState> {
    state = {
        open: false,
        airCheckInStatus: 'off' as AirCheckInStatus,
        airCheckIns: [{
            name: 'Curtis Upshall',
            day: 'Today',
            time: '9:15am'
        }]
    }

    handleClickOpen = () => {
        this.setState({ open: true })
    }

    handleClose = () => {
        this.setState({ open: false })
    }

    toggleAirCheckIn = () => {
        switch (this.state.airCheckInStatus) {
            case 'on': {
                this.setState({ airCheckInStatus: 'disabling' }, () => {
                    setTimeout(() => {
                        this.setState({ airCheckInStatus: 'off' })
                    }, 2000)
                })
                return
            }
            case 'off': {
                this.setState({ airCheckInStatus: 'enabling' }, () => {
                    setTimeout(() => {
                        this.setState({ airCheckInStatus: 'on' })
                    }, 2000)
                })
                return
            }
            case 'enabling': {
                this.setState({ airCheckInStatus: 'disabling' }, () => {
                    setTimeout(() => {
                        this.setState({ airCheckInStatus: 'off' })
                    }, 2000)
                })
                return
            }
            case 'disabling': {
                this.setState({ airCheckInStatus: 'disabling' }, () => {
                    setTimeout(() => {
                        this.setState({ airCheckInStatus: 'on' })
                    }, 2000)
                })
                return
            }
            case 'disabled':
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
                    badgeCount={this.state.airCheckIns.length}
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
                            <h4>Scan or Enter</h4>
                        </div>
                        <div className='text-check-in'>
                            <div className='text-check-in__entry'>
                                <a className='entry_check-in_label'><Icon>how_to_reg</Icon></a>
                                <input type='text' placeholder='Student Number' />
                                <Icon className='entry_icon-return'>subdirectory_arrow_left</Icon>
                            </div>
                        </div>
                        <div className='check-in_heading'>
                                <h4>Air Check-in</h4>
                                <Switch 
                                    checked={['on', 'enabling'].includes(this.state.airCheckInStatus)}
                                    onChange={this.toggleAirCheckIn}
                                />
                                <Grow in={['enabling', 'disabling'].includes(this.state.airCheckInStatus)}>
                                    <CircularProgress color='primary' />
                                </Grow>
                                <h4 className='air-check-in__status'>Online</h4>
                            </div>
                        <div className='air-check-in'>
                            <p>Waiting for Air Check-ins...</p>
                        </div>
                    </div>
                </Dialog>
            </>
        )
    }
}