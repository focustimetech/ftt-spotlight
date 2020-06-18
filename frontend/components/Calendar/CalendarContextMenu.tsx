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

import { ICalendarEvent, ICalendarEventContext, ICalendarContextDetails } from '../../types/calendar'
import p from '../../utils/pluralize'

import Flexbox from '../Layout/Flexbox'
import AppointmentsForm from '../Form/Forms/AppointmentsForm'

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
    getTitle?: (contextDetails: ICalendarContextDetails) => React.ReactNode
    editable?: boolean
    actions?: ICalendarContextMenuAction[]
    options?: ICalendarContextMenuOption[]
    contextDetails: ICalendarContextDetails
}

const CalendarContextMenu = (props: ICalendarContextMenuProps) => {
    const open: boolean = Boolean(props.anchorEl)
    const { contextDetails, editable, getTitle } = props
    const { event, date, title, color } = contextDetails
    const { context } = event
    const isLive: boolean = true

    // Build context items
    let contextList: IContentMenuListItem[]
    if (context) {
        contextList = []
        /*
        if (context.airCheckIns) {
            contextList.push({
                icon: 'wifi_tethering',
                label: `${context.airCheckIns} pending ${p('Air Check-in', context.airCheckIns.length)}`
            })
        }
        */
        if (context.appointments) {
            contextList.push({
                icon: 'supervised_user_circle',
                label: `${context.appointments} ${p('Appointment', context.appointments.length)}`
            })
        }
        if (context.attended) {
            contextList.push({ icon: 'done', label: 'Student attended' })
        }
        if (context.ledgerEntries) {
            contextList.push({
                icon: context.ledgerEntries.length === 1 ? 'done' : 'done_all',
                label: `${context.ledgerEntries} ${p('student', context.ledgerEntries.length)} checked-in`,
                isLive
            })
        }
        if (context.missedAppointment) {
            contextList.push({ icon: 'warning', label: 'Missed appointment' })
        }
        if (context.plans) {
            contextList.push({
                icon: 'bookmark',
                label: `${context.plans} ${p('student', context.plans.length)} anticipated`
            })
        }
    }
    return (
        <Popover
            PaperProps={{ className: 'context-menu', elevation: 6 }}
            open={open}
            anchorEl={props.anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            onClose={props.onClose}
            elevation={4}
        >
            <Flexbox className='context-menu__actions'>
                {editable && (
                    <>
                        <Tooltip title='Create Appointment'>
                            <IconButton><Icon>supervised_user_circle</Icon></IconButton>
                        </Tooltip>
                        <Tooltip title='Options'>
                            <IconButton><Icon>more_vert</Icon></IconButton>
                        </Tooltip>
                    </>
                )}
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
                        <span className='context-menu__color' style={{ background: `#${color}` }} />
                    </div>
                    <div>
                        {getTitle ? getTitle(contextDetails) : <Typography variant='h5'>{title}</Typography>}
                        <Typography variant='subtitle1' className='context-menu__datetime'>
                            {format(date, 'iiii, LLLL d')}<span>•</span>{event.startTime} – {event.endTime}
                        </Typography>
                    </div>
                </Flexbox>
                {event.context.location && (
                    <Flexbox className='context-menu__row'>
                        <div className='context-menu__icon'><Icon>room</Icon></div>
                        <div><Typography variant='subtitle1'>{event.context.location.name}</Typography></div>
                    </Flexbox>
                )}
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
            <AppointmentsForm event={event} date={date} />
        </Popover>
    )
}

export default CalendarContextMenu
