import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import ContentLoader from 'react-content-loader'

import {
    MenuItem,
    TextField,
    Typography
} from '@material-ui/core'

import {
    IReportVariantInfo,
    Report,
    ReportingState,
    ReportSegment
} from '../../types/report'
import { DateRange } from '../../types/date'
import { DateWidget } from './DateWidget'
import { ReportNameWidget } from './ReportNameWidget'
import { DATE_SEGMENT_LABELS } from '../../utils/date'

interface IProps extends RouteComponentProps {
    loading: boolean
    report: Report
    reportingState: ReportingState
    variantDetails: IReportVariantInfo
    onUpdateReport: (params: Partial<Report>) => void
}

class ReportEditor extends React.Component<IProps> {
    handleChangeDateRange = (dateRange: DateRange) => {
        this.props.onUpdateReport({ date_range: dateRange })
    }

    handleChangeSegment = (event: any) => {
        const segment: ReportSegment = event.target.value as ReportSegment
        this.props.onUpdateReport({ segment })
    }

    handleChangeName = (name: string) => {
        this.props.onUpdateReport({ name })
    }

    render() {
        return (
            <div className='report' id='report'>
                <div className='report__header'>
                    <div className='header_info'>
                        {this.props.loading ? (
                            <div style={{ width: 200, height: 70 }}>
                                <ContentLoader width={200} height={70}>
                                    <rect x={0} y={0} rx={4} ry={4} height={14} width={160} />
                                    <rect x={0} y={32} rx={4} ry={4} height={38} width={200} />
                                </ContentLoader>
                            </div>
                        ) : (
                            <>
                                <Typography variant='overline'>{this.props.variantDetails.name}</Typography>
                                <ReportNameWidget name={this.props.report.name} onSubmit={this.handleChangeName} />
                            </>
                        )}
                    </div>
                    <div className='header_actions'>
                        <div>
                            <TextField
                                value={this.props.report.segment}
                                onChange={this.handleChangeSegment}
                                label='Segment'
                                select
                                variant='outlined'
                                disabled={this.props.loading}
                            >
                                {Object.keys(DATE_SEGMENT_LABELS).map((segment: ReportSegment) => (
                                    <MenuItem value={segment} key={segment}>{DATE_SEGMENT_LABELS[segment][1]}</MenuItem>
                                ))}
                            </TextField>
                        </div>
                        <div>
                            <DateWidget
                                dateRange={this.props.report.date_range}
                                onChange={this.handleChangeDateRange}
                                disabled={this.props.loading}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export { ReportEditor }
