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
    userId: number
    message: string
    files?: ITicketEventFile[]
}

export interface ITicketEventFile {
    id: number
    name: string
    size: number
    path: string
}


export interface INewTicket extends Pick<ITicket, 'subject'> {
    body: string
    filesPaths?: string[]
}

export interface INewTicketEvent extends Omit<ITicketEvent, 'id' | 'files'> {
    filePaths?: string[]
}