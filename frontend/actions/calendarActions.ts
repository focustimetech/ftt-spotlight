import { Calendar } from '../types/calendar'
import { IReduxAction } from '../types/redux'
import API from '../utils/api'
import { FETCH_CALENDAR } from './types'

export const fetchCalendar = (date?: Date) => {
    return (dispatch: (action: IReduxAction<Calendar>) => void) => {
        return API.get('/calendar').then((res: any) => {
            dispatch({
                type: FETCH_CALENDAR,
                payload: res.data
            })
        })
    }
}
