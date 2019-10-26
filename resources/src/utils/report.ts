import { IReport, Report, ReportVariant } from "../types/report"

export const EMPTY_REPORT: IReport = {
    name: 'New Report',
    date_range: {
        type: 'predefined',
        range: 'last-week'
    },
    segment: 'day',
    access: 'private'
}

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
