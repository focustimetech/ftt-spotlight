import * as React from 'react'

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent
} from '@material-ui/core'

import {
    IAppointment,
    IBlockDetails,
    ICalendarDialogGroup,
    ICalendarItemAction,
    ICalendarItemDetails,
    ILedgerEntry,
    IScheduled,
    ItemMap,
} from '../../types/calendar'
import { IStaff } from '../../types/staff'
import { isEmpty } from '../../utils/utils'

import { EnhancedDialogTitle } from '../Modals/EnhancedDialogTitle'
import { CalendarDialogItem } from './CalendarDialogItem'

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

    return (
        <Dialog open={props.open} className='calendar-block-dialog'>
            <EnhancedDialogTitle className='calendar-block-dialog__title' onClose={handleClose}>
                <h4 className='label'>{label || 'Unlaballed Block'}<span>{`${start} - ${end}`}</span></h4>
                <h3 className='date'>{date}</h3>
            </EnhancedDialogTitle>
            <DialogContent>
                {props.calendarDialogGroups && props.calendarDialogGroups.length > 0 ? (
                    props.calendarDialogGroups.map((calendarGroup: ICalendarDialogGroup) => {
                        const hasEmptyState: boolean = Boolean(calendarGroup.emptyState)
                        const hasData: boolean = calendarGroup.keys.some((key: string) => {
                            return props.blockDetails.data[key] && props.blockDetails.data[key].length > 0
                        })
                        if (!hasData && !hasEmptyState) {
                            return null
                        }

                        return (
                            <div key={calendarGroup.name}>
                                <h5 className='section-header'>{calendarGroup.name}</h5>
                                <section className='section'>
                                    {!isEmpty(props.blockDetails.data) ? (
                                        hasData ? (
                                            calendarGroup.keys.map((groupKey: string, keyIndex: number) => (
                                                props.blockDetails.data[groupKey].map((data: any, index: number) => {
                                                    const itemMap: ItemMap = calendarGroup.itemMaps[keyIndex]
                                                    if (!itemMap) {
                                                        return
                                                    }
                                                    const itemDetails: ICalendarItemDetails
                                                        = itemMap(data, props.blockDetails)
                                                    const actions: ICalendarItemAction[] = calendarGroup.actions ? (
                                                        calendarGroup.actions(data, props.blockDetails)
                                                    ) : undefined
                                                    return <>
                                                        <CalendarDialogItem
                                                            details={itemDetails}
                                                            actions={actions}
                                                            key={index}
                                                            onCloseDialog={handleClose}
                                                        />
                                                        {calendarGroup.children && (
                                                            calendarGroup.children(data, props.blockDetails)
                                                        )}
                                                    </>
                                                })
                                            ))
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
