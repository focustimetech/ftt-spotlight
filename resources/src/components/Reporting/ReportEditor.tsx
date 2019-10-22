import * as React from 'react'

import {
    Typography
} from '@material-ui/core'

import { Report, ReportingState } from '../../types/report'

interface IProps {
    report: Report
    reportingState: ReportingState
    onUpdateReport: (params: Partial<Report>) => void
}

class ReportEditor extends React.Component<IProps> {
    render() {
        return (
            <div className='report' id='report'>
                <Typography variant='h2'>New Report</Typography>
            </div>
        )
    }
}

export { ReportEditor }
