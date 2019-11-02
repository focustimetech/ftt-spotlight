import { CHECK_IN, FETCH_CHECKIN_STATUS } from '../actions/types'
import { CheckInStatus, ICheckInResponse } from '../types/checkin'

interface IState {
    status: CheckInStatus
    response: ICheckInResponse
}

const initialState: IState = {
    status: {
        date: { day: '', full_date: '', date: 0, is_today: false },
        blocks: [],
        next: '',
        previous: '',
        today: ''
    },
    response: null
}

interface IAction {
    type: string
    payload: any
}

export const checkinReducer = (state = initialState, action: IAction) => {
    switch (action.type) {
        case FETCH_CHECKIN_STATUS:
            return {
                ...state,
                status: action.payload
            }
        case CHECK_IN:
            return {
                ...state,
                response: action.payload
            }
        default:
            return state
    }
}
