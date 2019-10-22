import * as React from 'react'

import {
    Typography
} from '@material-ui/core'

import { IReport, ReportingState } from '../../types/report'

interface IProps {
    report: IReport
    reportingState: ReportingState
    onUpdateReport: (params: Partial<IReport>) => void
}

class Report extends React.Component<IProps> {
    render() {
        return (
            <div className='report' id='report'>
                <Typography variant='h2'>New Report</Typography>
            </div>
        )
    }
}