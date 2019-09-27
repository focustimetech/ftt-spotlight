import { IFullDate, IBlock, ILedgerEntry, ISchedulePlan } from './calendar'

/**
 * @TODO Depricate this interface and all associated types/classes
 */
export interface ICheckInStatus {
    block: any
    air_enabled: boolean
    air_requests: any[]
    scheduled: any[]
    checked_in: any[]
}

export interface CheckInStatusBlock {
    block: IBlock
    ledger_entries: ILedgerEntry[]
    planned: ISchedulePlan[]
}

export interface CheckInStatus {
    date: IFullDate
    blocks: CheckInStatusBlock[]
}
