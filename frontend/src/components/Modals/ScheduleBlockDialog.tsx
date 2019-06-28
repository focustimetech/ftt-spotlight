import * as React from 'react'
import * as classNames from 'classnames'

import {
    Button,
    Dialog,
    DialogContent,
    DialogActions,
    Icon,
    IconButton,
    Tooltip
} from '@material-ui/core'

import { BlockDetails } from '../Schedule'
import { EnhancedDialogTitle } from './EnhancedDialogTitle'

interface ScheduleItemDetails {
    id?: number
    variant: string
    title: string
    time?: string
    memo?: string
    method?: string
}

interface ScheduleItemAction {
    icon: string,
    title: string,
    callback: (params: any) => any
}

const scheduleItem = (details: ScheduleItemDetails, isEditing?: boolean, actions?: ScheduleItemAction[]) => {
    const { id, variant, time, title, memo, method } = details
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
    console.log('method: ', method)

    return (
        <div className={classNames('log', `--${variant}`)} key={id}>
            <div>
                <h6 className='log__title'>
                    {title}
                    {time && (
                        <span className='log__time'>
                            {time}
                            <Tooltip className='icon' title={methodTitle}><Icon>{methodIcon}</Icon></Tooltip>
                        </span>
                    )}
                </h6>
                {memo && <p className='log__memo'>{memo}</p>}
            </div>
            {isEditing === true && (
                <div>
                    {actions.map((action: ScheduleItemAction, index: number) => (
                        <Tooltip title={action.title}>
                            <IconButton onClick={() => action.callback}><Icon>{action.icon}</Icon></IconButton>
                        </Tooltip>
                    ))}
                </div>
            )}
        </div>
    )
}

interface IProps {
    details: BlockDetails
    open: boolean
    onClose: () => void
}

export const ScheduleBlockDialog = (props: IProps) => {
    const [isEditing, setEditing] = React.useState(false)

    const handleEditingToggle = () => {
        setEditing(isEditing === false)
    }

    const handleClose = () => {
        setEditing(false)
        props.onClose()
    }

    const { label, logs, flex, scheduled, appointments, pending, start, end, date } = props.details
    console.log(props.details)
    return (
        <Dialog open={props.open} className='schedule-block-dialog'>
            <EnhancedDialogTitle className='schedule-block-dialog__title' onClose={handleClose}>
                <h4 className='label'>{label || 'Unlaballed Block'}<span>{`${start} - ${end}`}</span></h4>
                <h3 className='date'>{date}</h3>
            </EnhancedDialogTitle>
            <DialogContent>
                <h5 className='section-header'>Logs</h5>
                <section className='section'>
                    {logs && logs.length > 0 ? (
                        logs.map((log: any, index: number) => (
                            scheduleItem(
                                {
                                    id: index,
                                    time: log.time,
                                    title: log.staff.name,
                                    memo: log.topic,
                                    variant: 'success',
                                    method: log.method
                                },
                                isEditing,
                                [{ icon: 'delete', title: 'Remove', callback: () => null}]
                            )
                        ))
                    ) : (
                        <p>No attendance recorded</p>
                    )}
                </section>
                <h5 className='section-header'>Scheduled</h5>
                <section className='section'>
                    {scheduled ? (
                        scheduleItem({
                            title: scheduled.name,
                            variant: pending ? null : (
                                flex === true ? (
                                    logs.some(((log: any) => log.staff.id === scheduled.id)) ? 'success' : 'fail'
                                ) : (
                                    logs.length > 0 ? 'success' : 'fail'
                                )
                            ),
                            memo: scheduled.topic
                        })
                    ) : (
                        <p>Nothing scheduled</p>
                    )}
                </section>
                {appointments && appointments.length > 0 && (
                    <>
                        <h5 className='section-header'>Appointments</h5>
                        <section className='section'>
                            {appointments.map((appointment: any, index: number) => (
                                scheduleItem({
                                    id: index,
                                    title: appointment.staff.name,
                                    memo: appointment.memo,
                                    variant: pending ? 'pending' : (
                                        logs.some(((log: any) => log.staff.id === appointment.staff.id)) ? 'success' : 'fail'
                                    )
                                })
                            ))}
                        </section>
                    </>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={() => handleEditingToggle()} color='primary'>{isEditing ? 'Done' : 'Edit'}</Button>
                <Button onClick={() => handleClose()}>Close</Button>
            </DialogActions>
        </Dialog>
    )
}