import { IStudent } from "./auth"

type LedgerChipStatus =
    | 'queued'
    | 'succeeded'
    | 'failed'

export interface INewLedgerChip {
    blockId: number
    date: string
    buffer: LedgerBuffer
}
export interface ILedgerChip {
    value: string
    timestamp: Date
    status: LedgerChipStatus
}

export type LedgerBuffer = Record<string, ILedgerChip>

export interface ILedgerEntry {
    
}

export interface AirCheckIn {
    code: string | null
    requests: IStudent[]
}

export interface IAirCodeRequest {
    blockId: number
    date: string
}
