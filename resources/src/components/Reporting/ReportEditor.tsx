import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import ContentLoader from 'react-content-loader'

import {
    MenuItem,
    TextField,
    Typography
} from '@material-ui/core'

import { Report, ReportingState, ReportSegment } from '../../types/report'
import { DateRange } from '../../types/date'
import { DateWidget } from './DateWidget'
import { DATE_SEGMENT_LABELS } from '../../utils/date'

interface IProps extends RouteComponentProps {
    report: Report
    reportingState: ReportingState
    onUpdateReport: (params: Partial<Report>) => void
}

class ReportEditor extends React.Component<IProps> {
    handleChangeDateRange = (dateRange: DateRange) => {
        this.props.onUpdateReport({ dateRange })
    }

    handleChangeSegment = (event: any) => {
        const segment: ReportSegment = event.target.value as ReportSegment
        this.props.onUpdateReport({ segment })
    }

    render() {
        return (
            <div className='report' id='report'>
                <Typography variant='h4'>{this.props.report.name}</Typography>
                <div className='report__date_range'>
                    <TextField
                        value={this.props.report.segment}
                        onChange={this.handleChangeSegment}
                        label='Segment'
                        select
                        variant='outlined'
                    >
                        {Object.keys(DATE_SEGMENT_LABELS).map((segment: ReportSegment) => (
                            <MenuItem value={segment} key={segment}>{DATE_SEGMENT_LABELS[segment][1]}</MenuItem>
                        ))

                        }
                    </TextField>
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
