import { IStudent } from "./auth"

type LedgerChipStatus =
    | 'queued'
    | 'succeeded'
    | 'failed'

export interface ILedgerEntry {
    // id: number // Removed from Resource
    date: string
    memo: string
    method: 'plan' | 'air' | 'search' | 'number'
    studentId: number
    blockId: number
    teacherId: number
    createdAt: string
}

export interface AirCheckIn {
    code: string | null
    requests: IStudent[]
}

export interface IAirCodeRequest {
    blockId: number
    date: string
}
