import { IBlock } from './calendar'
import { IStudent } from './auth';

type CheckInChipStatus =
    | 'queued'
    | 'succeeded'
    | 'failed'

export interface ICheckInChip {
    value: string
    timestamp: Date
    status: CheckInChipStatus
}

export type CheckInBuffer = Record<string, ICheckInChip>

export interface ILedgerEntry {
    
}

export interface IAirCheckIn {

}
