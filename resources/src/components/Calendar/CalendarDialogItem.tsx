import * as React from 'react'
import classNames from 'classnames'

import {
    Icon,
    Menu,
    Tooltip
} from '@material-ui/core'

import { LoadingIconButton } from '../Form/LoadingIconButton'
import { LoadingMenuItem } from '../Form/LoadingMenuItem'
import { ICalendarItemDetails, ICalendarItemAction } from '../../types/calendar'

interface IProps {
    details: ICalendarItemDetails
    actions?: ICalendarItemAction[]
    disabled?: boolean
    loading?: boolean
    unavailable?: boolean
    onCloseDialog: () => void
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
        case 'roll-call':
            methodIcon = 'assignment'
            methodTitle = 'Via roll call'
            break
        case 'amendment':
            methodIcon = 'assignment_turned_in',
            methodTitle = 'Amended'
            break
    }

    const clickable: boolean = Boolean(props.onClick)

    const setLoading = (index: number) => {
        setLoadingActions([...loadingActions, index])
    }

    const unsetLoading = (index: number) => {
        setLoadingActions(loadingActions.filter((loadingAction: number) => loadingAction !== index))
    }

    const handleClickMenu = (event: any) => {
        setMenuRef(event.currentTarget)
    }

    const handleActionCallback = (action: ICalendarItemAction, index: number) => {
        const { callback, closeOnCallback } = action
        setLoading(index)
        callback()
            .then(() => {
                unsetLoading(index)
                if (closeOnCallback)
                    props.onCloseDialog()
                handleClose()
            })
            .catch(() => {
                unsetLoading(index)
            })
    }

    const handleClose = () => {
        setMenuRef(null)
    }

    const handleClick = (onClick: () => void) => {
        if (props.disabled || props.unavailable)
            return
        onClick()
    }

    return (
        <div
            className={classNames(
                'calendar_item',
                'calendar_item__container',
                `--${variant}`,
                {['--selectable']: clickable},
                {['--disabled']: props.disabled || props.unavailable}
            )}
            key={id}
            onClick={clickable ? () => handleClick(props.onClick) : undefined}
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
                {memo && (
                    <div className='calendar_item__memo'>
                        {props.unavailable && (<Tooltip title='Teacher is Unavailable'><Icon>block</Icon></Tooltip>)}
                        <p>{memo}</p>
                    </div>
                )}
            </div>
            {(props.actions && props.actions.length > 0) && (
                <div className='calendar_item__actions'>
                    <LoadingIconButton onClick={handleClickMenu} loading={props.loading === true}>
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
                                onClick={() => handleActionCallback(action, index)}
                                loading={loadingActions.indexOf(index) !== -1}
                            >{action.value}</LoadingMenuItem>
                        ))}
                    </Menu>
                </div>          
            )}
        </div>
    )
}
