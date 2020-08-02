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
import MessageEntry, { IFileUpload } from '../../components/Tickets/MessageEntry'
import TopBar from '../../components/TopBar'
import withAuth from '../../hocs/withAuth'


interface ITicketPageProps {
    ticket: ITicket
}

interface ITicketPageState {
    inputValue: string
    fileUploads: IFileUpload[]
    sending: boolean
}


interface IReduxProps {
    // tickets: ITicket[]
    currentUser: IUser
    ticketEvents: ITicketEvent[]
    createTicketEvent: (ticketId: number, newTicketEvent: INewTicketEvent) => Promise<any>
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
    ticketEvent: {
        paddingTop: theme.spacing(1),
        width: '100%',
        alignItems: 'flex-start',
        marginBottom: theme.spacing(2),

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
    paragraph: {
        '& + p': {
            marginBottom: theme.spacing(1)
        }
    },
    fileContent: {
        padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
        minWidth: 120
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
        sending: false
    }

    handleChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const { value } = event.target
        this.setState({ inputValue: value })
    }

    handleChangeFiles = (fileUploads: IFileUpload[]) => {
        this.setState({ fileUploads })
    }

    handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const newTicketEvent: INewTicketEvent = {
            message: this.state.inputValue,
            files: this.state.fileUploads
                .filter((file: IFileUpload) => !file.removed)
                .map((file: IFileUpload) => ({
                    name: file.file.name,
                    size: file.file.size,
                    path: file.path
                }))
        }
        this.setState({ sending: true })
        this.props.createTicketEvent(this.props.ticket.id, newTicketEvent).then(() => {
            this.setState({ sending: false, inputValue: '', fileUploads: [] })
        }, (error: any) => {
            this.setState({ sending: false })
        })
    }

    render() {
        const { classes, ticket, ticketEvents } = this.props
        console.log('ticketEvents:', ticketEvents)

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
                                            {ticketEvent.message.split('\n').map((paragraph: string) => (
                                                <Typography component='p' className={classes.paragraph} variant='body1'>
                                                    {paragraph}
                                                </Typography>
                                            ))}
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
                    <MessageEntry
                        inputValue={this.state.inputValue}
                        fileUploads={this.state.fileUploads}
                        onChange={this.handleChange}
                        onChangeFiles={this.handleChangeFiles}
                        onSubmit={this.handleSubmit}
                        sending={this.state.sending}
                    />
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
