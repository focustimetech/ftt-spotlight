import { IUser } from './auth'

type TicketStatus = 'OPEN' | 'CLOSED' | 'REOPENED' | 'RESOLVED'

export interface ITicket {
    subject: string
    id: number
    userId: number
    assigneeId : number
    status: TicketStatus
}

export interface ITicketEvent {
    id: number
    ticketId: number
    user: IUser
    message: string
    createdAt: string
    files?: ITicketEventFile[]
}

export interface ITicketEventFile {
    id: number
    name: string
    size: number
}

export interface INewTicketEventFile extends Omit<ITicketEventFile, 'id'> {
    path: string
}

export type INewTicket = Pick<ITicket, 'subject'> & INewTicketEvent

export interface INewTicketEvent {
    message: string
    files: INewTicketEventFile[]
}