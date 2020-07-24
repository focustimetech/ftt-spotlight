import { INewCalendarContext } from '../types/calendar'
import { AirCheckIn, ILedgerEntry } from '../types/checkin'
import { IReduxAction } from '../types/redux'
import { DELETE_AIR_CODE, NEW_AIR_CODE, UPDATE_CALENDAR_CONTEXT } from './types'

import API from '../utils/api'

export const studentCheckIn = (ledgerEntry: ILedgerEntry) => {
    return (dispatch: (action: IReduxAction<'UPDATE_CALENDAR_CONTEXT', INewCalendarContext>) => void) => {
        dispatch({
            type: UPDATE_CALENDAR_CONTEXT,
            payload: {
                date: ledgerEntry.date,
                blockId: ledgerEntry.blockId,
                context: { ledgerEntries: [ledgerEntry] }
            }
        })
        return API.post('/check-in/', ledgerEntry)
    }
}

export const createAirCode = (blockId: number, date: string) => {
    return (dispatch: (action: IReduxAction<AirCheckIn>) => void) => {
        return API.post('/check-in/air', { blockId, date }).then((res: any) => {
            dispatch({
                type: NEW_AIR_CODE,
                payload: res.data
            })
        })
    }
}
