import { IReport, Report, ReportVariant } from "../types/report"

export const EMPTY_REPORT: IReport = {
    name: 'New Report',
    dateRange: {
        type: 'predefined',
        range: 'last-week'
    },
    segment: 'day',
    access: 'private'
}

export const createEmptyReport = (reportVariant: ReportVariant, report: IReport = EMPTY_REPORT): Report => {
    /*
        let reportDetails: Exclude<Report, IReport>
        switch (reportVariant) {
            case 'student-attendance':
                reportDetails = {}
        }
        return {
            ...report,

        }
        */
    }
