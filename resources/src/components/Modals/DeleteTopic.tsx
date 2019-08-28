import * as React from 'react'
import classNames from 'classnames'

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@material-ui/core'

import { ITopic } from '../../types/calendar'
import { LoadingButton } from '../Form/LoadingButton'

interface IProps {
    topic: ITopic
    open: boolean
    onSubmit: (topic: ITopic) => Promise<any>
    onClose: () => void
}

export const DeleteTopic = (props: IProps) => {
    const [loading, setLoading]: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
        = React.useState(false)

    const handleSubmit = () => {
        setLoading(true)
        props.onSubmit(props.topic)
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
            <DialogTitle>Delete Topic</DialogTitle>
            <DialogContent>
                {props.topic ? <>
                    <DialogContentText>The following topic will be deleted:</DialogContentText>
                    <div className={classNames('calendar_item', `--${props.topic.color}`)}>
                        <div>
                            <h6 className='calendar_item__title'>
                                {props.topic.memo}
                            </h6>
                        </div>
                    </div>
                </> : (
                    <DialogContentText>Are you sure you want to delete this topic?</DialogContentText>
                )}
            </DialogContent>
            <DialogActions>
                <LoadingButton loading={loading} variant='text' color='primary' onClick={() => handleSubmit()}>Confirm</LoadingButton>
                <Button variant='text' onClick={() => props.onClose()}>Cancel</Button>
            </DialogActions>
        </Dialog>
    )
}
