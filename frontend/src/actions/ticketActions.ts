import { INewTicketEvent, ITicketEvent } from '../types/ticket'
import API from '../utils/api'

import { FETCH_TICKET_EVENTS, FETCH_TICKETS, NEW_TICKET_EVENT } from './types'

export const fetchTickets = () => {
    return (dispatch: any) => {
        return API.get('/tickets/')
            .then((res: any) => {
                const tickets = res.data
                dispatch({
                    type: FETCH_TICKETS,
                    payload: tickets
                })
            })
    }
}

export const fetchTicketEvents = (ticketId: number) => {
    return (dispatch: any) => {
        return API.get<ITicketEvent[]>(`/tickets/${ticketId}`).then((res) => {
            const ticketEvents = res.data
            dispatch({
                type: FETCH_TICKET_EVENTS,
                payload: ticketEvents
            })
        })
    }
}

export const createTicketEvent = (ticketId: number, newTicketEvent: INewTicketEvent) => {
    return (dispatch: any) => {
        return API.post<ITicketEvent>(`/tickets/${ticketId}/reply`, newTicketEvent).then((res) => {
            const ticketEvent: ITicketEvent = res.data
            dispatch({
                type: NEW_TICKET_EVENT,
                payload: ticketEvent
            })
        })
    }
}