import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import ContentLoader from 'react-content-loader'

import {
    Typography
} from '@material-ui/core'

import { Report, ReportingState } from '../../types/report'
import { DateRange } from '../../types/date'
import { DateWidget } from './DateWidget'

interface IProps extends RouteComponentProps {
    report: Report
    reportingState: ReportingState
    onUpdateReport: (params: Partial<Report>) => void
}

class ReportEditor extends React.Component<IProps> {
    handleChangeDateRange = (dateRange: DateRange) => {
        this.props.onUpdateReport({ dateRange })
    }

    render() {
        return (
            <div className='report' id='report'>
                <Typography variant='h4'>{this.props.report.name}</Typography>
                <div className='report__date_range'>
                    <Typography variant='h6'>Date Range</Typography>
                    <DateWidget
                        dateRange={this.props.report.dateRange}
                        onChange={this.handleChangeDateRange}
                    />
                </div>
            </div>
        )
    }
}

export { ReportEditor }
