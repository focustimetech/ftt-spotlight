import API from '../utils/api'
import { IReduxAction } from '../types/redux'
import { NEW_AIR_CODE, DELETE_AIR_CODE, UPDATE_LEDGER_BUFFER } from './types'
import { LedgerBuffer, INewLedgerChip, AirCheckIn } from '../types/checkin'

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
