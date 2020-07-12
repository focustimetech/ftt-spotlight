export interface ITicket {
    title: string
    id: number
    userId : number
    assigneeId : number
    status: TicketAction
}

export interface ITicketEvent {
    message: string
    id: number
    ticketId: number
    action: TicketAction
    files: ITicketEventFile[]
}

export interface ITicketEventFile {
    path: string
    id: number
    ticketEventId: number
}

type TicketAction = 'OPEN' | 'CLOSED' | 'AWAIT' | 'REOPEN' | 'RESOLVED'



export type INewTicket = Omit<ITicket, 'assigneeId' | 'userId' | 'id'>