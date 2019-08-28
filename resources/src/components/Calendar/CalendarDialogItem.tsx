import * as React from 'react'
import classNames from 'classnames'

import {
    Icon,
    IconButton,
    Tooltip,
    Menu,
    MenuItem
} from '@material-ui/core'

import { ICalendarItemDetails, ICalendarItemAction } from '../../types/calendar'

interface IProps {
    details: ICalendarItemDetails
    actions?: ICalendarItemAction[]
    onClick?: () => void
}

export const CalendarDialogItem = (props: IProps) => {
    const { id, variant, time, title, memo, method } = props.details
    const [menuRef, setMenuRef]: [any, React.Dispatch<React.SetStateAction<any>>]
        = React.useState(null)

    let methodIcon = ''
    let methodTitle = ''
    switch (method) {
        case 'manual':
            methodIcon = 'keyboard'
            methodTitle = 'Via manual check-in'
            break
        case 'air':
            methodIcon = 'wifi'
            methodTitle = 'Via Air Check-in'
            break
        case 'role-call':
            methodIcon = 'assignment'
            methodTitle = 'Via roll call'
    }

    const handleClick = (event: any) => {
        setMenuRef(event.currentTarget)
    }

    const handleCallback = (callback: ICalendarItemAction['callback']) => {
        handleClose()
        callback()
    }

    const handleClose = () => {
        setMenuRef(null)
    }

    return (
        <div className={classNames('calendar_item', 'calendar_item__container', `--${variant}`)} key={id}>
            <div onClick={handleClick}>
                <h6 className='calendar_item__title'>
                    {title}
                    {time && (
                        <span className='calendar_item__time'>
                            {time}
                            <Tooltip className='icon' title={methodTitle}><Icon>{methodIcon}</Icon></Tooltip>
                        </span>
                    )}
                </h6>
                {memo && <p className='calendar__memo'>{memo}</p>}
            </div>
            {(props.actions && props.actions.length > 0) && (
                <div className='calendar_item__actions'>
                    <IconButton onClick={handleClick}><Icon>more_vert</Icon></IconButton>
                    <Menu
                        anchorEl={menuRef}
                        open={Boolean(menuRef)}
                        onClose={() => handleClose()}
                    >
                        {props.actions.map((action: ICalendarItemAction) => (
                            <MenuItem key={action.value} onClick={() => handleCallback(action.callback)}>{action.value}</MenuItem>
                        ))}
                    </Menu>
                </div>          
            )}
        </div>
    )
}
