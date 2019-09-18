import * as React from 'react'
import classNames from 'classnames'

import {
    Icon,
    Tooltip,
    Menu,
    MenuItem
} from '@material-ui/core'

import { LoadingIconButton } from '../Form/LoadingIconButton'
import { LoadingMenuItem } from '../Form/LoadingMenuItem'
import { ICalendarItemDetails, ICalendarItemAction } from '../../types/calendar'

interface IProps {
    details: ICalendarItemDetails
    actions?: ICalendarItemAction[]
    loading?: boolean
    onClick?: () => void
}

export const CalendarDialogItem = (props: IProps) => {
    const { id, variant, time, title, memo, method } = props.details
    const [menuRef, setMenuRef]: [any, React.Dispatch<React.SetStateAction<any>>]
        = React.useState(null)
    const [loadingActions, setLoadingActions]: [number[], React.Dispatch<React.SetStateAction<number[]>>]
        = React.useState([])

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

    const clickable: boolean = Boolean(props.onClick)

    const setLoading = (index: number) => {
        setLoadingActions([...loadingActions, index])
    }

    const unsetLoading = (index: number) => {
        setLoadingActions(loadingActions.filter((loadingAction: number) => loadingAction !== index))
    }

    const handleClick = (event: any) => {
        setMenuRef(event.currentTarget)
    }

    const handleCallback = (callback: ICalendarItemAction['callback'], index: number) => {
        setLoading(index)
        callback()
            .then(() => {
                unsetLoading(index)
                handleClose()
            })
            .catch(() => {
                unsetLoading(index)
            })
    }

    const handleClose = () => {
        setMenuRef(null)
    }

    return (
        <div
            className={classNames(
                'calendar_item',
                'calendar_item__container',
                `--${variant}`,
                {['--selectable']: clickable}
            )}
            key={id}
            onClick={clickable ? () => props.onClick() : undefined}
        >
            <div>
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
                    <LoadingIconButton onClick={handleClick} loading={props.loading === true}>
                        <Icon>more_vert</Icon>
                    </LoadingIconButton>
                    <Menu
                        anchorEl={menuRef}
                        open={Boolean(menuRef)}
                        onClose={() => handleClose()}
                    >
                        {props.actions.map((action: ICalendarItemAction, index: number) => (
                            <LoadingMenuItem
                                key={action.value}
                                onClick={() => handleCallback(action.callback, index)}
                                loading={loadingActions.indexOf(index) !== -1}
                            >{action.value}</LoadingMenuItem>
                        ))}
                    </Menu>
                </div>          
            )}
        </div>
    )
}
