import { AxiosResponse } from 'axios'
import React from 'react'

import {
    Avatar,
    Button,
    Chip,
    CircularProgress,
    Collapse,
    createStyles,
    Icon,
    IconButton,
    TextField,
    Theme,
    Tooltip,
    Typography,
    withStyles,
    WithStyles
} from '@material-ui/core'

import API from '../../utils/api'
import { getFileSizeStringFromBytes, getIconFromFileExtension } from '../../utils/utils'

import ChipContainer from '../ChipContainer'
import LoadingButton from '../Form/Components/LoadingButton'
import Flexbox from '../Layout/Flexbox'

export interface IFileUpload {
    file: File
    filesize: string
    status: 'loading' | 'done' | 'error'
    progress: number
    removed: boolean
    path: string
}

interface IMessageEntryProps {
    inputValue: string
    sending: boolean
    placeholder?: string
    disabled?: boolean
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void
    onSubmit: (event: React.FormEvent<HTMLFormElement>, files: IFileUpload[]) => void
}

interface IMessageEntryState {
    fileUploads: IFileUpload[]
}

const useStyles = (theme: Theme) => createStyles({
    form: {
        width: '100%',
        flex: '0',
        borderTop: '1px solid #EEE',
        padding: `${theme.spacing(1)}px ${theme.spacing(2)}px ${theme.spacing(1.5)}px`,
        boxSizing: 'border-box'
    },
    textField: {
        flex: '1'
    },
    entryAction: {
        display: 'flex',
        height: 56,
        alignItems: 'center',
        flexFlow: 'row nowrap'
    },
    fileUploads: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        paddingBottom: theme.spacing(1)
    },
    fileChipIcon: {
        width: 18,
        height: 18
    },
    timestamp: {
        color: '#5F6368'
    }
})

class MessageEntry extends React.Component<IMessageEntryProps & WithStyles<typeof useStyles>, IMessageEntryState> {
    state: IMessageEntryState = {
        fileUploads: []
    }

    handleUploadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        const { files } = event.target
        Array.from(files).forEach((file: File) => {
            let index: number
            const upload: IFileUpload = {
                file,
                filesize: getFileSizeStringFromBytes(file.size),
                status: 'loading',
                progress: 0,
                removed: false,
                path: null
            }
            this.setState((state: IMessageEntryState) => {
                index = state.fileUploads.length
                return { fileUploads: [...state.fileUploads, upload] }
            }, () => {
                const formData: FormData = new FormData()
                formData.append('file', file)
                API.post('/tickets/file', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                    onUploadProgress: (progressEvent: any) => {
                        this.setState((state: IMessageEntryState) => {
                            const nextUploads: IFileUpload[] = [...state.fileUploads]
                            nextUploads[index] = { ...nextUploads[index], progress: (100 * progressEvent.loaded) / progressEvent.total }
                            return { fileUploads: nextUploads}
                        })
                    }
                }).then((res: AxiosResponse<string>) => {
                    const path: string = res.data
                    this.setState((state: IMessageEntryState) => {
                        const nextUploads: IFileUpload[] = [...state.fileUploads]
                        nextUploads[index] = { ...nextUploads[index], status: 'done', path }
                        return { fileUploads: nextUploads}
                    })
                }, (error: any) => {
                    this.setState((state: IMessageEntryState) => {
                        const nextUploads: IFileUpload[] = [...state.fileUploads]
                        nextUploads[index] = { ...nextUploads[index], status: 'error' }
                        return { fileUploads: nextUploads}
                    })
                })
            })
        })

        // console.log('fileList:', files)
    }

    handleRemoveFile = (index: number) => {
        //
    }

    handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        this.props.onSubmit(event, this.state.fileUploads)
    }

    render() {
        const { fileUploads } = this.state
        const { classes, disabled, inputValue, sending } = this.props

        return (
            <form className={classes.form} onSubmit={this.handleSubmit}>
                <Collapse in={fileUploads.length > 0}>
                    <ChipContainer className={classes.fileUploads}>
                        {fileUploads.map((upload: IFileUpload, index: number) => {
                            const { file, path } = upload
                            const fileParts: string[] = file.name.split('.')
                            const extension: string = fileParts[fileParts.length - 1]
                            const label: string = `${file.name} (${upload.filesize})`
                            return (
                                <Chip
                                    key={index}
                                    avatar={
                                        <Avatar>
                                            {upload.status === 'error' && (
                                                <Icon className={classes.fileChipIcon}>error</Icon>
                                            )}
                                            {upload.status === 'done' && (
                                                <Icon className={classes.fileChipIcon}>{getIconFromFileExtension(extension)}</Icon>
                                            )}
                                            {upload.status === 'loading' && (
                                                <CircularProgress
                                                    size={18}
                                                    variant={upload.progress < 100 ? 'static' : 'indeterminate'}
                                                    value={upload.progress}
                                                />
                                            )}
                                        </Avatar>
                                    }
                                    label={label}
                                    onDelete={() => this.handleRemoveFile(index)}
                                />
                            )
                        })}
                    </ChipContainer>
                </Collapse>
                <Flexbox alignItems='flex-end' flexDirection='row'>
                    <div className={classes.entryAction}>
                        <Tooltip title='Add attachments'>
                            <IconButton component='label'>
                                <input
                                    type='file'
                                    onChange={this.handleUploadFile}
                                    style={{ display: 'none' }}
                                    id='ticket-file-upload'
                                    multiple
                                />
                                <Icon>attachment</Icon>
                            </IconButton>
                        </Tooltip>
                    </div>
                    <TextField
                        variant='outlined'
                        label='Your message'
                        name='ticket-message-entry'
                        placeholder={this.props.placeholder ?? 'How can we help?'}
                        className={classes.textField}
                        fullWidth
                        multiline
                        value={inputValue}
                        onChange={this.props.onChange}
                        disabled={sending || disabled}
                    />
                    <div className={classes.entryAction}>
                        <LoadingButton
                            type='submit'
                            color='primary'
                            disabled={inputValue.length === 0 || sending || disabled}
                            loading={sending}
                        >Send</LoadingButton>
                    </div>
                </Flexbox>
            </form>
        )
    }
}

export default withStyles(useStyles)(MessageEntry)
