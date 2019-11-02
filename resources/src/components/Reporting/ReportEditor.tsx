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
} from '../../types/report'
import { DateRange } from '../../types/date'
import { DateWidget } from './DateWidget'
import { ReportNameWidget } from './ReportNameWidget'
import { REPORT_PLACEHOLDER_NAME } from '../../utils/report'

interface IProps extends RouteComponentProps {
    loading: boolean
    report: Report
    reportingState: ReportingState
    variantDetails: IReportVariantInfo
    onUpdateReport: (params: Partial<Report>) => void
}

class ReportEditor extends React.Component<IProps> {
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
                                <ReportNameWidget name={this.props.report.name || REPORT_PLACEHOLDER_NAME} onSubmit={this.handleChangeName} />
                            </>
                        )}
                    </div>
                    <div className='header_actions'>
                        <div>
                            <DateWidget
                                dateRange={this.props.report.date_range}
                                segment={this.props.report.segment}
                                onUpdateReport={this.props.onUpdateReport}
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
