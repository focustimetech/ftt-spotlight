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
    const handleClose = () => {
        props.onClose()
    }
    const { date, end, flex, label, pending, start } = props.blockDetails
    //console.log('CalendarDialog.PROPS:', props)
    return (
        <Dialog open={props.open} className='calendar-block-dialog'>
            <EnhancedDialogTitle className='calendar-block-dialog__title' onClose={handleClose}>
                <h4 className='label'>{label || 'Unlaballed Block'}<span>{`${start} - ${end}`}</span></h4>
                <h3 className='date'>{date}</h3>
            </EnhancedDialogTitle>
            <DialogContent>
                {props.calendarDialogGroups && props.calendarDialogGroups.length > 0 ? (
                    props.calendarDialogGroups.map((calendarGroup: ICalendarDialogGroup) => {
                        return (
                            <div key={calendarGroup.key}>
                                <h5 className='section-header'>{calendarGroup.name}</h5>
                                <section className='section'>
                                    {!isEmpty(props.blockDetails.data) ? (
                                        props.blockDetails.data[calendarGroup.key]
                                        && props.blockDetails.data[calendarGroup.key].length > 0 ? (
                                            props.blockDetails.data[calendarGroup.key].map((data: any, index: number) => {
                                                if (!calendarGroup.itemMap)
                                                    return
                                                const itemDetails: ICalendarItemDetails = calendarGroup.itemMap(data, props.blockDetails)
                                                const actions: ICalendarItemAction[] = calendarGroup.actions ? (
                                                    calendarGroup.actions(data, props.blockDetails)
                                                ) : undefined
                                                return <>
                                                    <CalendarDialogItem
                                                        details={itemDetails}
                                                        actions={actions}
                                                        key={index}
                                                    />
                                                    {calendarGroup.children && (
                                                        calendarGroup.children(data, props.blockDetails)
                                                    )}
                                                </>
                                            })
                                        ) : (
                                            !calendarGroup.children && calendarGroup.emptyState(props.blockDetails)
                                        )
                                    ) : (
                                        <p className='empty_text'>No data available</p>
                                    )}
                                    {calendarGroup.child && (
                                        calendarGroup.child(props.blockDetails)
                                    )}
                                </section>
                            </div>
                        )
                    })
                ) : (
                    <p className='empty_text'>Nothing to show</p>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={() => handleClose()}>Close</Button>
            </DialogActions>
        </Dialog>
    )
}
