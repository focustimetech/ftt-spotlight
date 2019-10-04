import { IFullDate, IBlock, ILedgerEntry, ISchedulePlan } from './calendar'
import { IStudent } from './student';

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

export interface ICheckInRequest {
    student_numbers?: string[]
    student_ids?: number[]
    date_time?: string    
}

interface StudentNumberChip {
    type: 'student_number'
    value: string
}

interface StudentIDChip {
    type: 'id'
    value: IStudent
}

export type CheckInChip = (StudentNumberChip | StudentIDChip) & {
    loading: boolean
}
