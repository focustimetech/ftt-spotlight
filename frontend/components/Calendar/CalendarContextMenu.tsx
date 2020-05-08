import classNames from 'classnames'
import { format } from 'date-fns'
import React from 'react'

import {
    Icon,
    IconButton,
    Paper,
    Popover,
    Tooltip,
    Typography
} from '@material-ui/core'

import { ICalendarEvent, ICalendarEventContext } from '../../types/calendar'
import p from '../../utils/pluralize'

import Flexbox from '../Layout/Flexbox'

interface IContentMenuListItem {
    icon: string
    label: string
    isLive?: boolean
}

export interface ICalendarContextMenuOption {
    label: string
    onClick: () => void
}

export interface ICalendarContextMenuAction extends ICalendarContextMenuOption {
    icon?: string
}

interface ICalendarContextMenuProps {
    anchorEl: Element
    onClose: () => void
    event: ICalendarEvent
    date: Date
    context?: ICalendarEventContext
    actions?: ICalendarContextMenuAction[]
    options?: ICalendarContextMenuOption[]
}

const CalendarContextMenu = (props: ICalendarContextMenuProps) => {
    const open: boolean = Boolean(props.anchorEl)
    const { event, context, date } = props
    const isLive: boolean = true

    // Build context items
    let contextList: IContentMenuListItem[]
    if (context) {
        contextList = []
        if (context.airCheckIns) {
            contextList.push({
                icon: 'wifi_tethering',
                label: `${context.airCheckIns} pending ${p('Air Check-in', context.airCheckIns)}`
            })
        }
        if (context.appointments) {
            contextList.push({
                icon: 'supervised_user_circle',
                label: `${context.appointments} ${p('Appointment', context.appointments)}`
            })
        }
        if (context.attended) {
            contextList.push({ icon: 'done', label: 'Student attended' })
        }
        if (context.ledgerEntries) {
            contextList.push({
                icon: context.ledgerEntries === 1 ? 'done' : 'done_all',
                label: `${context.ledgerEntries} ${p('student', context.ledgerEntries)} checked-in`,
                isLive
            })
        }
        if (context.missedAppointment) {
            contextList.push({ icon: 'warning', label: 'Missed appointment' })
        }
        if (context.plans) {
            contextList.push({
                icon: 'bookmark',
                label: `${context.plans} ${p('student', context.plans)} anticipated`
            })
        }
    }
    return (
        <Popover
            PaperProps={{ className: 'context-menu' }}
            open={open}
            anchorEl={props.anchorEl}
            onClose={props.onClose}
            elevation={4}
        >
        
            <Flexbox className='context-menu__actions'>
                <Tooltip title='Options'>
                    <IconButton><Icon>more_vert</Icon></IconButton>
                </Tooltip>
                <Tooltip title='Close'>
                    <IconButton onClick={() => props.onClose()}>
                        <Icon>close</Icon>
                    </IconButton>
                </Tooltip>
            </Flexbox>
            <div className='context-menu__content'>
                <div className='context-menu__label'>
                    <Typography variant='overline'>{event.label}</Typography>
                </div>
                <Flexbox className={classNames('context-menu__row', 'context-menu__details')}>
                    <div className='context-menu__icon'>
                        <span className='context-menu__color' style={{ background: `#${event.color}` }} />
                    </div>
                    <div>
                        <Typography variant='h5'>{event.title}</Typography>
                        <Typography variant='subtitle1'>{format(date, 'iiii, LLLL M')}</Typography>
                    </div>
                </Flexbox>
                <Flexbox className='context-menu__row'>
                    <div className='context-menu__icon'><Icon>room</Icon></div>
                    <div><Typography variant='subtitle1'>{event.location.name}</Typography></div>
                </Flexbox>
                {contextList && contextList.map((listItem: IContentMenuListItem) => (
                    <Flexbox className='context-menu__row'>
                        <div className='context-menu__icon'>
                            <Icon>{listItem.icon}</Icon>
                        </div>
                        <div>
                            <Typography variant='subtitle1'>
                                {listItem.isLive && (
                                    <span className='--live' />
                                )}
                                {listItem.label}
                            </Typography>
                        </div>
                    </Flexbox>
                ))}
            </div>
        </Popover>
    )
}

export default CalendarContextMenu