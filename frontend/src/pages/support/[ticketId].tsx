import { AxiosResponse } from 'axios'
import { format, formatDistance } from 'date-fns'
import Head from 'next/head'
import React from 'react'
import { connect } from 'react-redux'

import {
    Avatar as MuiAvatar,
    Button,
    Chip,
    CircularProgress,
    Collapse,
    createStyles,
    Icon,
    IconButton,
    makeStyles,
    TextField,
    Theme,
    Tooltip,
    Typography,
    withStyles,
    WithStyles
} from '@material-ui/core'

import { createTicketEvent, fetchTicketEvents, fetchTickets } from '../../actions/ticketActions'
import { NextPageContext } from '../../types'
import { IUser } from '../../types/auth'
import {
    INewTicketEvent,
    ITicket,
    ITicketEvent,
    ITicketEventFile
} from '../../types/ticket'
import API from '../../utils/api'
import { makeDocumentTitle, truncate } from '../../utils/document'
import p from '../../utils/pluralize'
import redirect from '../../utils/redirect'
import { getFileSizeStringFromBytes, getIconFromFileExtension } from '../../utils/utils'

import Avatar from '../../components/Avatar'
import ChipContainer from '../../components/ChipContainer'
import LoadingButton from '../../components/Form/Components/LoadingButton'
import Flexbox from '../../components/Layout/Flexbox'
import Section from '../../components/Layout/Section'
import TopBar from '../../components/TopBar'
import withAuth from '../../hocs/withAuth'


interface ITicketPageProps {
    ticket: ITicket
}



interface IReduxProps {
    // tickets: ITicket[]
    currentUser: IUser
    ticketEvents: ITicketEvent[]
    createTicketEvent: (ticketId: number, newTicketEvent: INewTicketEvent) => Promise<any>
}

interface ITicketPageState {
    inputValue: string
    fileUploads: IFileUpload[]
    sending: boolean
}

interface IFileUpload {
    file: File
    filesize: string
    status: 'loading' | 'done' | 'error'
    progress: number
    removed: boolean
    path: string
}

const testTicket: ITicket = {
    id: 1,
    subject: 'Help I can\'t figure this out',
    userId: 5,
    assigneeId: 50,
    status: 'OPEN'
}

const useStyles = (theme: Theme) => createStyles({
    root: {
        alignItems: 'normal',
        height: '100vh',

        '& > *': {
            flex: '0'
        }
    },
    ticketEvents: {
        flex: '1',
        width: '100%',
        height: '100%',
        boxSizing: 'border-box',
        overflowX: 'auto',
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1)
    },
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
    ticketEvent: {
        paddingTop: theme.spacing(1),
        width: '100%',
        alignItems: 'flex-start',
        // marginBottom: theme.spacing(2),

        '& + *': {
            marginTop: theme.spacing(2),
            borderTop: '1px solid #EEE',
            paddingTop: theme.spacing(2),
        }
    },
    ticketEventBody: {
        flex: '1',
        paddingLeft: theme.spacing(2)
    },
    avatar: {
        height: theme.spacing(6),
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    userDetails: {
        height: theme.spacing(6),
        marginBottom: theme.spacing(2),

        '& > h6': {
            lineHeight: `${theme.spacing(4)}px`
        },

        '& > p': {
            lineHeight: `${theme.spacing(2)}px`
        }
    },
    files: {
        paddingTop: theme.spacing(1),
        marginTop: theme.spacing(2),
        borderTop: '1px solid #EEE'
    },
    file: {
        position: 'relative',

        '& > a': {
            zIndex: 2,
            opacity: 0,
            visibility: 'hidden',
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            background: 'rgba(0,0,0,0.5)',
            borderRadius: 2,
            color: '#FFF',

            '& > *': {
                width: 40,
                height: 40,
                position: 'absolute',
                top: '50%',
                left: theme.spacing(2),
                transform: 'translateY(-50%)'
            }
        },

        '&:hover > a': {
            opacity: 1,
            visibility: 'visible'
        }
    },
    fileContent: {
        padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
        minWidth: 120
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

class TicketPage extends React.Component<ITicketPageProps & IReduxProps & WithStyles<typeof useStyles>, ITicketPageState> {
    static getInitialProps = async (context: NextPageContext) => {
        const { store } = context
        const isServer: boolean = typeof window === 'undefined'
        const ticketId: number = Number(context.query.ticketId)
        let tickets: ITicket[] = store.getState().tickets.tickets
        if (!tickets || tickets.length === 0) {
            await store.dispatch(fetchTickets())
            tickets = store.getState().tickets.tickets
        }
        const ticket: ITicket = tickets.find((t: ITicket) => t.id === ticketId)
        if (!ticket) {
            redirect('/support', context || undefined)
            return {}
            /*
            if (isServer) {
                //
            }
            */
        }
        await store.dispatch(fetchTicketEvents(ticketId))

        return { ticket }
    }

    state: ITicketPageState = {
        inputValue: '',
        fileUploads: [],
        sending: false,
    }

    handleChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const { value } = event.target
        this.setState({ inputValue: value })
    }

    handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const newTicketEvent: INewTicketEvent = {
            message: this.state.inputValue,
            files: this.state.fileUploads.map((file: IFileUpload) => ({
                name: file.file.name,
                size: file.file.size,
                path: file.path
            }))
        }
        this.setState({ sending: true })
        this.props.createTicketEvent(this.props.ticket.id, newTicketEvent).then(() => {
            this.setState({ sending: false, fileUploads: [], inputValue: '' })
        }, (error: any) => {
            this.setState({ sending: false })
        })
    }

    handleDownload = (file: ITicketEventFile) => {
        //`${API.getBaseUrl()}/tickets/file/${file.id}`)
    }

    handleUploadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log('handleUploadFile()')
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
            this.setState((state: ITicketPageState) => {
                index = state.fileUploads.length
                return { fileUploads: [...state.fileUploads, upload] }
            }, () => {
                const formData: FormData = new FormData()
                formData.append('file', file)
                API.post('/tickets/file', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                    onUploadProgress: (progressEvent: any) => {
                        this.setState((state: ITicketPageState) => {
                            const nextUploads: IFileUpload[] = [...state.fileUploads]
                            nextUploads[index] = { ...nextUploads[index], progress: (100 * progressEvent.loaded) / progressEvent.total }
                            return { fileUploads: nextUploads}
                        })
                    }
                }).then((res: AxiosResponse<string>) => {
                    const path: string = res.data
                    this.setState((state: ITicketPageState) => {
                        const nextUploads: IFileUpload[] = [...state.fileUploads]
                        nextUploads[index] = { ...nextUploads[index], status: 'done', path }
                        return { fileUploads: nextUploads}
                    })
                }, (error: any) => {
                    this.setState((state: ITicketPageState) => {
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

    render() {
        console.log('STATE:', this.state)
        console.log('PROPS:', this.props)
        const { classes, ticket, ticketEvents } = this.props
        const { fileUploads, inputValue, sending } = this.state

        return (
            <div>
                <Head><title>{makeDocumentTitle(truncate(ticket.subject, 20))}</title></Head>
                <Flexbox flexDirection='column' className={classes.root} disableSpacing>
                    <TopBar title={ticket.subject}></TopBar>
                    <Section className={classes.ticketEvents}>
                        <Flexbox flexDirection='column' disableSpacing>
                            {ticketEvents.map((ticketEvent: ITicketEvent) => {
                                const { user } = ticketEvent
                                const hasFiles: boolean = ticketEvent.files && ticketEvent.files.length > 0
                                return (
                                    <Flexbox key={ticketEvent.id} className={classes.ticketEvent} disableSpacing>
                                        <div className={classes.avatar}>
                                            <Avatar avatar={user.avatar} />
                                        </div>
                                        <div className={classes.ticketEventBody}>
                                            <div className={classes.userDetails}>
                                                <Typography variant='h6'>{user.name}</Typography>
                                                <Flexbox className={classes.timestamp}>
                                                    <Typography variant='body1'>{format(new Date(ticketEvent.createdAt), 'MMM d, h:mm aa')}</Typography>
                                                    {hasFiles && (
                                                        <Icon>attachment</Icon>
                                                    )}
                                                </Flexbox>
                                            </div>
                                            <Typography variant='body1'>{ticketEvent.message}</Typography>
                                            {hasFiles && (
                                                <div className={classes.files}>
                                                    <Typography variant='subtitle1'>{`${ticketEvent.files.length} ${p('Attachment', ticketEvent.files.length)}`}</Typography>
                                                    <ChipContainer>
                                                        {ticketEvent.files.map((file: ITicketEventFile, index: number) => {
                                                            const fileParts: string[] = file.name.split('.')
                                                            const extension: string = fileParts[fileParts.length - 1]
                                                            return (
                                                                <li key={index}>
                                                                    <form className={classes.file} action={`${API.getBaseUrl()}/api/tickets/file/${file.id}`} method='get'>
                                                                        <a>
                                                                            <IconButton type='submit' color='inherit'>
                                                                                <Icon>cloud_download</Icon>
                                                                            </IconButton>
                                                                        </a>
                                                                        <Flexbox className={classes.fileContent}>
                                                                            <MuiAvatar><Icon>{getIconFromFileExtension(extension)}</Icon></MuiAvatar>
                                                                            <div>
                                                                                <Typography variant='body1'>{file.name}</Typography>
                                                                                <Typography variant='body2'>{getFileSizeStringFromBytes(file.size)}</Typography>
                                                                            </div>
                                                                        </Flexbox>
                                                                    </form>
                                                                </li>
                                                            )
                                                        })}
                                                    </ChipContainer>
                                                </div>
                                            )}
                                        </div>
                                    </Flexbox>
                                )
                            })}
                        </Flexbox>
                    </Section>
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
                                                <MuiAvatar>
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
                                                </MuiAvatar>
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
                                placeholder='How can we help?'
                                className={classes.textField}
                                fullWidth
                                multiline
                                value={inputValue}
                                onChange={this.handleChange}
                            />
                            <div className={classes.entryAction}>
                                <LoadingButton
                                    type='submit'
                                    color='primary'
                                    disabled={inputValue.length === 0}
                                    loading={sending}
                                >Send</LoadingButton>
                            </div>
                        </Flexbox>
                    </form>
                </Flexbox>
            </div>
        )
    }
}

const mapStateToProps = (state: any) => ({
    currentUser: state.auth.user,
    ticketEvents: state.tickets.ticketEvents
})

const mapDispatchToProps = { createTicketEvent }

export default withAuth('sysadmin', 'teacher', 'staff')(connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(TicketPage)))
