import { IReport, Report, ReportVariant } from "../types/report"

export const EMPTY_REPORT: IReport = {
    date_range: {
        type: 'predefined',
        range: 'last-week'
    },
    segment: 'day',
    access: 'private'
}

export const REPORT_PLACEHOLDER_NAME = 'New Report'

/**
 * Creates an empty report when given a report variant
 * @param variant The report variant.
 * @param report The empty report.
 */
export const createEmptyReport = (variant: ReportVariant, report: IReport = EMPTY_REPORT): Report => {
        return {
            variant,
            ...report
        }
    }
