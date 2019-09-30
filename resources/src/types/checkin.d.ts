import { IFullDate, IBlock, ILedgerEntry, ISchedulePlan } from './calendar'

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
