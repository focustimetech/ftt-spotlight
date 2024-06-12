import { AxiosResponse } from 'axios'
import React from 'react'

import {
    Avatar,
    Button,
    Chip,
    CircularProgress,
    Collapse,
    createStyles,
    FormHelperText,
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
    fileUploads: IFileUpload[]
    sending: boolean
    placeholder?: string
    disabled?: boolean
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void
    onChangeFiles: (uploads: IFileUpload[]) => void
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}

const fileTooLarge = (upload: IFileUpload): boolean => {
    return upload.file.size > 20971520 // 20 MB file limit
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
    entryAction: (props: IMessageEntryProps) => ({
        display: 'flex',
        height: 56,
        alignItems: 'center',
        flexFlow: 'row nowrap',
        marginBottom: props.fileUploads.some((file: IFileUpload) => fileTooLarge(file)) ? 22 : 0
    }),
    fileUploads: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        paddingBottom: theme.spacing(1)
    },
    fileChipIcon: {
        fontSize: 18
    },
    timestamp: {
        color: '#5F6368'
    }
})

class MessageEntry extends React.Component<IMessageEntryProps & WithStyles<typeof useStyles>> {
    handleUploadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        const { files } = event.target
        Array.from(files).forEach((file: File) => {
            const index: number = this.props.fileUploads.length
            const upload: IFileUpload = {
                file,
                filesize: getFileSizeStringFromBytes(file.size),
                status: 'loading',
                progress: 0,
                removed: false,
                path: null
            }
            this.props.onChangeFiles([...this.props.fileUploads, upload])
            const formData: FormData = new FormData()
            formData.append('file', file)
            API.post('/tickets/file', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                onUploadProgress: (progressEvent: any) => {

                    const nextUploads: IFileUpload[] = [...this.props.fileUploads]
                    nextUploads[index] = { ...nextUploads[index], progress: (100 * progressEvent.loaded) / progressEvent.total }
                    this.props.onChangeFiles(nextUploads)

                }
            }).then((res: AxiosResponse<string>) => {
                const path: string = res.data
                const nextUploads: IFileUpload[] = [...this.props.fileUploads]
                nextUploads[index] = { ...nextUploads[index], status: 'done', path }
                this.props.onChangeFiles(nextUploads)
            }, (error: any) => {
                const nextUploads: IFileUpload[] = [...this.props.fileUploads]
                nextUploads[index] = { ...nextUploads[index], status: 'error' }
                this.props.onChangeFiles(nextUploads)
            })
        })
    }

    handleRemoveFile = (index: number) => {
        const nextUploads: IFileUpload[] = [...this.props.fileUploads]
        nextUploads[index] = { ...nextUploads[index], removed: true }
        this.props.onChangeFiles(nextUploads)
    }

    render() {
        const { classes, disabled, inputValue, fileUploads, sending } = this.props

        return (
            <form className={classes.form} onSubmit={this.props.onSubmit}>
                <Collapse in={fileUploads.length > 0}>
                    <ChipContainer className={classes.fileUploads}>
                        {fileUploads.map((upload: IFileUpload, index: number) => {
                            if (upload.removed || fileTooLarge(upload)) {
                                return
                            }
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
                                    // multiple
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
                        helperText={this.props.fileUploads.some((upload: IFileUpload) => fileTooLarge(upload)) ? (
                            this.props.fileUploads.length > 1
                                ? 'One of the files you uploaded exceeds the maximum file limit (20 MB).'
                                : 'The file you uploaded exceeds the maximum file limit (20 MB).'
                        ) : undefined}
                       FormHelperTextProps={{ color: 'error' }}
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
