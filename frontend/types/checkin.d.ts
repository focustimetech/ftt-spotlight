import { IFullDate, IBlock, ILedgerEntry, ISchedulePlan } from './calendar'
import { IStudent } from './student';
import { ISelectChip } from '../components/ChipSelect';

export interface CheckInStatusBlock {
    block: IBlock
    ledger_entries: ILedgerEntry[]
    planned: ISchedulePlan[]
}

export interface CheckInStatus {
    blocks: CheckInStatusBlock[]
    date: IFullDate
    next: string
    previous: string
    today: string
}

export interface ICheckInResponse {
    success: ILedgerEntry[]
    timestamp_string: string
    errors?: string[]
}

export interface ICheckInError {
    timestamp_string: string
    errors: string[]
}

export interface ICheckInChip {
    timestamp: string
    value: string | number
}

export interface ICheckInRequest {
    date?: string
    type: 'student_number' | 'student_id'
    chips: ICheckInChip[]
}
