import { AirCheckIn, ILedgerEntry } from '../types/checkin'
import { IReduxAction } from '../types/redux'
import { DELETE_AIR_CODE, NEW_AIR_CODE, STUDENT_CHECK_IN } from './types'

import API from '../utils/api'

export const studentCheckIn = (ledgerEntry: ILedgerEntry) => {
    return (dispatch: (action: IReduxAction<ILedgerEntry>) => void) => {
        dispatch({
            type: STUDENT_CHECK_IN,
            payload: ledgerEntry
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
