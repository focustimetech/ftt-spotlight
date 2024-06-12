import { AxiosResponse } from 'axios'
import React from 'react'
import { connect } from 'react-redux'

import {
    Dialog,
    DialogContent,
    DialogContentText,
    TextField,
    Typography
} from '@material-ui/core'

import { ISnackbar, queueSnackbar } from '../../actions/snackbarActions'
import { createTicket } from '../../actions/ticketActions'
import { INewTicket, ITicket } from '../../types/ticket'

import MessageEntry, { IFileUpload } from '../Tickets/MessageEntry'
import { EnhancedDialogTitle } from './EnhancedDialogTitle'

interface IReduxProps {
    createTicket: (ticket: INewTicket) => Promise<any>
    queueSnackbar: (snackbar: ISnackbar) => void
}

interface INewTicketDialogProps {
    open: boolean
    onClose: () => void
}

const NewTicketDialog = (props: INewTicketDialogProps & IReduxProps) => {
    const [inputValue, setInputValue] = React.useState('')
    const [subject, setSubject] = React.useState('')
    const [fileUploads, setFileUploads] = React.useState([])
    const [sending, setSending] = React.useState(false)

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const { value } = event.target
        setInputValue(value)
    }

    const handleChangeSubject = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const { value } = event.target
        setSubject(value)
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const newTicket: INewTicket = {
            subject,
            message: inputValue,
            files: fileUploads
                .filter((file: IFileUpload) => !file.removed)
                .map((file: IFileUpload) => ({
                    name: file.file.name,
                    size: file.file.size,
                    path: file.path
                }))
        }
        setSending(true)
        props.createTicket(newTicket).then((res: AxiosResponse<ITicket>) => {
            console.log('res:', res)
            props.onClose()
            const ticket: ITicket = res.data
            props.queueSnackbar({
                message: 'Your Ticket has been created successfully.',
                links: [{ value: 'View Ticket', href: `/support/${ticket.id}` }]
            })
            setSending(false)
            setInputValue('')
            setFileUploads([])
        }, (error: any) => {
            setSending(false)
        })
    }

    return (
        <Dialog open={props.open}>
            <EnhancedDialogTitle title='Create Support Ticket' onClose={props.onClose} />
            <DialogContent>
                <DialogContentText>Please describe your problem in detail below.</DialogContentText>
                <TextField
                    value={subject}
                    disabled={sending}
                    onChange={handleChangeSubject}
                    fullWidth
                    label='Subject'
                    placeholder='What can we help you with?'
                    variant='filled'
                />
            </DialogContent>
            <div>
                <MessageEntry
                    fileUploads={fileUploads}
                    inputValue={inputValue}
                    onChange={handleChange}
                    onChangeFiles={setFileUploads}
                    onSubmit={handleSubmit}
                    sending={sending}
                    placeholder='Please describe your problem in detail.'
                />
            </div>
        </Dialog>
    )
}

const mapDispatchToProps = { createTicket, queueSnackbar }

export default connect(null, mapDispatchToProps)(NewTicketDialog)
