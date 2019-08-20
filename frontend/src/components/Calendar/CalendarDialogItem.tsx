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
    details: ICalendarItemDetails,
    isEditing: boolean,
    actions?: ICalendarItemAction[]
}

export const CalendarDialogItem = (props: IProps) => {
    const { id, variant, time, title, memo, method } = props.details
    const { actions, isEditing } = props
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
    }

    const handleClick = (event: any) => {
        setMenuRef(event.currentTarget)
    }

    const handleClose = () => {
        setMenuRef(null)
    }

    return (
        <div className={classNames('calendar_item', `--${variant}`)} key={id}>
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
            {(actions && actions.length) && (
                <div className='actions'>
                    <IconButton onClick={handleClick}><Icon>more_vert</Icon></IconButton>
                    <Menu
                        ref={menuRef}
                        open={Boolean(menuRef)}
                        onClose={() => handleClose()}
                    >
                        {actions.map((action: ICalendarItemAction) => (
                            <MenuItem onClick={() => action.callback}>{action.value}</MenuItem>
                        ))}
                    </Menu>
                </div>          
            )}
        </div>
    )
}
