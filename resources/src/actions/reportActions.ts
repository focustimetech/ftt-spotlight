import axios from 'axios'

import {
    FETCH_REPORTS,
    CREATE_REPORT,
    UPDATE_REPORT,
    DELETE_REPORT
} from '../actions/types'

import { Report } from '../types/report'

export const fetchReports = () => {
    return (dispatch: any) => {
        return axios.get('/api/reports/self')
            .then((res: any) => dispatch({
                type: FETCH_REPORTS,
                payload: res.data
            }))
    }
}

export const createReport = (report: Report) => {
    return (dispatch: any) => {
        return axios.post('/api/reports', report)
            .then((res: any) => dispatch({
                type: CREATE_REPORT,
                payload: res.data
            }))
    }
}

export const updateReport = (report: Report) => {
    return (dispatch: any) => {
        return axios.put('/api/reports', report)
            .then((res: any) => dispatch({
                type: UPDATE_REPORT,
                payload: res.data
            }))
    }
}

export const deleteReport = (reportID: number) => {
    return (dispatch: any) => {
        return axios.delete(`/api/reports/${reportID}`)
            .then((res: any) => dispatch({
                type: DELETE_REPORT,
                payload: res.data
            }))
    }
}
