import axios from 'axios'

import { FETCH_NOTIFICATIONS } from './types'

export const fetchNotifications = () => {
    return (dispatch: any) => {
        return axios.get('http://localhost:8000/api/notifications')
            .then((res: any) => {
                const notifications = res.data
                dispatch({
                    type: FETCH_NOTIFICATIONS,
                    payload: notifications
                })
            })
    }
}
