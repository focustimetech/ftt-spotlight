import { FETCH_CHECKIN_STATUS, ENABLE_AIR, DISABLE_AIR } from '../actions/types'
import { ICheckInStatus } from '../types/checkin'

interface IState {
    status: ICheckInStatus
}

const initialState: IState = {
    status: {
        block: {},
        air_enabled: false,
        air_requests: [],
        scheduled: [],
        checked_in: []
    }
}

interface IAction {
    type: string,
    payload: ICheckInStatus
}

export const checkinReducer = (state = initialState, action: IAction) => {
    switch (action.type) {
        case FETCH_CHECKIN_STATUS:
            return {
                status: action.payload
            }
        default:
            return state
    }
}
