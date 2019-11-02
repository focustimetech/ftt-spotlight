import classNames from 'classnames'
import * as React from 'react'

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@material-ui/core'

import { LoadingButton } from '../Form/LoadingButton'

interface ICalendarItemPreview {
    title: string
    memo?: string
    variant?: string
}

interface IProps {
    title: string
    bodyText: string
    open: boolean
    calendarItem?: ICalendarItemPreview
    confirmButtonText?: string
    item?: any
    onSubmit: (item: any) => Promise<any>
    onClose: () => void
}

export const ConfirmationDialog = (props: IProps) => {
    const [loading, setLoading]: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
        = React.useState(false)

    const handleSubmit = () => {
        setLoading(true)
        props.onSubmit(props.item)
            .then((res: any) => {
                setLoading(false)
                props.onClose()
            })
            .catch((error: any) => {
                setLoading(false)
            })
    }

    return (
        <Dialog open={props.open}>
            <DialogTitle>{props.title}</DialogTitle>
            <DialogContent>
                {props.bodyText && (
                    <DialogContentText>{props.bodyText}</DialogContentText>
                )}
                {props.calendarItem && (
                    <div className={classNames(
                        'calendar_item',
                        {[`--${props.calendarItem.variant}`]: Boolean(props.calendarItem.variant)}
                    )}>
                        <div>
                            <h6 className='calendar_item__title'>
                                {props.calendarItem.memo}
                            </h6>
                        </div>
                    </div>
                )}
            </DialogContent>
            <DialogActions>
                <LoadingButton
                    loading={loading}
                    variant='text'
                    color='primary'
                    onClick={() => handleSubmit()}
                >{props.confirmButtonText || 'Confirm'}</LoadingButton>
                <Button variant='text' onClick={() => props.onClose()}>Cancel</Button>
            </DialogActions>
        </Dialog>
    )
}
