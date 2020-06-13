import API from '../utils/api'
import { IReduxAction } from '../types/redux'
import { UPDATE_LEDGER_BUFFER } from './types'
import { LedgerBuffer, INewLedgerChip } from '../types/checkin'

export const updateLedgerBuffer = (ledgerChip: INewLedgerChip) => {
    return (dispatch: (action: IReduxAction) => void) => {
        dispatch({
            type: UPDATE_LEDGER_BUFFER,
            payload: ledgerChip
        })
    }
}
