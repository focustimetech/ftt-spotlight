import { ITicketEvent } from '../types/ticket'
import API from '../utils/api'

import { FETCH_TICKET_EVENTS, FETCH_TICKETS } from './types'

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
