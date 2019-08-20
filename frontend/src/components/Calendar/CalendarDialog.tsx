import * as React from 'react'

import {
    Button,
    Dialog,
    DialogContent,
    DialogActions,
} from '@material-ui/core'

import {
    IAppointment,
    IBlockDetails,
    ICalendarItemAction,
    ICalendarDialogGroup,
    ILedgerEntry,
    IScheduled,
    ICalendarItemDetails,
} from '../../types/calendar'
import { isEmpty } from '../../utils/utils'
import { IStaff } from '../../types/staff'
import { CalendarDialogItem } from './CalendarDialogItem'
import { EnhancedDialogTitle } from '../Modals/EnhancedDialogTitle'

interface IProps {
    blockDetails: IBlockDetails
    calendarDialogGroups: ICalendarDialogGroup[]
    open: boolean
    onClose: () => void
}

export const CalendarDialog = (props: IProps) => {
    const [isEditing, setEditing] = React.useState(false)

    const handleEditingToggle = () => {
        setEditing(isEditing === false)
    }

    const handleClose = () => {
        setEditing(false)
        props.onClose()
    }
    console.log('PROPS:', props)
    const { data, date, end, flex, label, pending, start } = props.blockDetails

    return (
        <Dialog open={props.open} className='calendar-block-dialog'>
            <EnhancedDialogTitle className='calendar-block-dialog__title' onClose={handleClose}>
                <h4 className='label'>{label || 'Unlaballed Block'}<span>{`${start} - ${end}`}</span></h4>
                <h3 className='date'>{date}</h3>
            </EnhancedDialogTitle>
            <DialogContent>
                {props.calendarDialogGroups && props.calendarDialogGroups.length > 0 ? (
                    props.calendarDialogGroups.map((calendarGroup: ICalendarDialogGroup) => {
                        const items: ICalendarItemDetails[] = !isEmpty(data) ? (
                            data[calendarGroup.key].map((data: any) => calendarGroup.itemMap(data, props.blockDetails))
                        ) : null
                        return (
                            <>
                                <h5 className='section-header'>{calendarGroup.name}</h5>
                                <section className='section'>
                                    {items ? (
                                        items.length ? (
                                            items.map((itemDetails: ICalendarItemDetails) => (
                                                <CalendarDialogItem
                                                    details={itemDetails}
                                                    actions={calendarGroup.actions}
                                                />
                                            ))
                                        ) : calendarGroup.emptyState
                                    ) : (
                                        <p className='empty_text'>No data available</p>
                                    )
                                }
                                </section>
                            </>
                        )
                    })
                ) : (
                    <p className='empty_text'>Nothing to show</p>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={() => handleEditingToggle()} color='primary'>{isEditing ? 'Done' : 'Edit'}</Button>
                <Button onClick={() => handleClose()}>Close</Button>
            </DialogActions>
        </Dialog>
    )
}