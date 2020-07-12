import { CREATE_TICKET, FETCH_TICKET_EVENTS, FETCH_TICKETS, REPLY_TICKET, UPDATE_TICKET_STATUS } from '../actions/types'
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

export const ticketReducer = (state = initialState, action: IReduxAction<ITicket[] | ITicketEvent[]>) => {
    switch (action.type) {
        case FETCH_TICKETS:
            return {
                ...state,
                tickets: action.payload
            }
            /*
        case NEW_TOPIC:
            return {
                ...state,
                item: action.payload,
                items: [...state.items, action.payload]
            }
        case DELETE_TOPIC:
            const deleted: number = state.items.findIndex((item: ITopic) => item.id === action.payload.id)
            return {
                ...state,
                item: state.items[deleted],
                items: state.items.splice(deleted, 1)
            }*/
        default:
            return state
    }
}
