import API from '../utils/api'

import { FETCH_TICKETS } from './types'

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