import { ICalendar } from '../types/calendar'
import { IReduxAction } from '../types/redux'
import API from '../utils/api'
import { FETCH_CALENDAR } from './types'

export const fetchCalendar = (date?: Date) => {
    return (dispatch: (action: IReduxAction<ICalendar>) => void) => {
        return API.get<ICalendar>(date ? `/calendar/${date.toISOString()}` : '/calendar').then((res: any) => {
            console.log('date:', date)
            console.log('payload:', res.data)
            dispatch({
                type: FETCH_CALENDAR,
                payload: res.data
            })
        })
    }
}

export const fetchTeacherCalendar = (teacherId: number, date?: Date) => {
    return API.get<ICalendar>(date ? `/teacher/${teacherId}/calendar/${date.toISOString()}` : `/teacher/${teacherId}/calendar`)
}
