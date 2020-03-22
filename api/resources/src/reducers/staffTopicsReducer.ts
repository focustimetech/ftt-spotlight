import { IStaffTopic } from '../actions/studentScheduleActions'
import { FETCH_STAFF_LIST } from '../actions/types'
import { ReduxAction } from '../types/app'

interface IState {
    items: IStaffTopic[],
    item: IStaffTopic
}

const initialState: IState = {
    items: [],
    item: null
}

export const staffTopicsReducer = (state = initialState, action: ReduxAction<IStaffTopic>) => {
    switch (action.type) {
        case FETCH_STAFF_LIST:
            return {
                ...state,
                items: action.payload
            }
        default:
            return state
    }
}
