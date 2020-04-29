import React from 'react'

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Typography
} from '@material-ui/core'

import { IReportVariantInfo, Report } from '../../types/report'
import { LoadingButton } from '../Form/LoadingButton'

interface IProps {
    open: boolean
    report: Report
    variantDetails: IReportVariantInfo
    onClose: () => void
    onDelete: (reportID: number) => Promise<any>
}

const ReportDeleteModal = (props: IProps) => {
    const [loading, setLoading] = React.useState(false)

    const handleSubmit = () => {
        setLoading(true)
        props.onDelete(props.report.id)
            .then(() => {
                setLoading(false)
                props.onClose()
            })
            .catch((error: any) => {
                setLoading(false)
                props.onClose()
            })
    }

    return (
        <Dialog open={props.open}>
            <DialogTitle>Delete Report</DialogTitle>
            <DialogContent>
                <DialogContentText>Are you sure you want to delete this Report?</DialogContentText>
                {props.report && (
                    <div>
                        <Typography variant='overline'>{props.variantDetails.name}</Typography>
                        <Typography variant='h5'>{props.report.name || 'Report'}</Typography>
                        {props.report.date_created && (
                            <Typography variant='subtitle1'>{props.report.date_created}</Typography>
                        )}
                    </div>
                )}
            </DialogContent>
            <DialogActions>
                <Button variant='text' onClick={() => props.onClose()}>Cancel</Button>
                <LoadingButton
                    loading={loading}
                    variant='text'
                    color='primary'
                    onClick={() => handleSubmit()}
                >Delete</LoadingButton>
            </DialogActions>
        </Dialog>
    )
}

export { ReportDeleteModal }
