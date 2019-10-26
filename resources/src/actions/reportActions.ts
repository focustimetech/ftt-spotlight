import axios from 'axios'

import {
    FETCH_REPORTS,
    CREATE_REPORT,
    UPDATE_REPORT,
    DELETE_REPORT
} from '../actions/types'

import { IReport } from '../types/report'

export const fetchReports = () => {
    return (dispatch: any) => {
        return axios.get('/reports/self')
            .then((res: any) => dispatch({
                type: FETCH_REPORTS,
                payload: res.data
            }))
    }
}

export const createReport = (report: IReport) => {
    return (dispatch: any) => {
        return axios.post('/reports', report)
            .then((res: any) => dispatch({
                type: CREATE_REPORT,
                payload: res.data
            }))
    }
}

export const updateReport = (report: IReport) => {
    return (dispatch: any) => {
        return axios.put('/reports', report)
            .then((res: any) => dispatch({
                type: UPDATE_REPORT,
                payload: res.data
            }))
    }
}

export const deleteReport = (reportID: number) => {
    return (dispatch: any) => {
        return axios.delete(`/reports/${reportID}`)
            .then((res: any) => dispatch({
                type: DELETE_REPORT,
                payload: res.data
            }))
    }
}
