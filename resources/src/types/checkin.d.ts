import { IFullDate, IBlock, ILedgerEntry, ISchedulePlan } from './calendar'

export interface CheckInStatusBlock {
    block: IBlock
    ledger_entries: ILedgerEntry[]
    planned: ISchedulePlan[]
}

export interface CheckInStatus {
    date: IFullDate
    blocks: CheckInStatusBlock[]
}
