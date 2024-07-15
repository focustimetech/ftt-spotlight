import { FETCH_TICKET_EVENTS, FETCH_TICKETS, NEW_TICKET, NEW_TICKET_EVENT } from '../actions/types'
import { IReduxAction } from '../types/redux'
import { ITicket, ITicketEvent } from '../types/ticket'

interface IState {
    tickets: ITicket[]
    ticketEvents: ITicketEvent[]
}

const initialState: IState = {
    tickets: [],
    ticketEvents: []
}

export const ticketReducer = (state = initialState, action: IReduxAction<string, ITicket[] | ITicketEvent[]>) => {
    switch (action.type) {
        case FETCH_TICKETS:
            return {
                ...state,
                tickets: action.payload
            }
        case FETCH_TICKET_EVENTS:
            return {
                ...state,
                ticketEvents: action.payload
            }
        case NEW_TICKET_EVENT:
            return {
                ...state,
                ticketEvents: [...state.ticketEvents, action.payload]
            }
        case NEW_TICKET:
            return {
                ...state,
                tickets: [...state.tickets, action.payload]
            }
        default:
            return state
    }
}
