import Head from 'next/head'
import React from 'react'

import {
    Avatar as MuiAvatar,
    Button,
    Chip,
    CircularProgress,
    createStyles,
    Icon,
    IconButton,
    makeStyles,
    TextField,
    Theme,
    Tooltip,
    Typography,
} from '@material-ui/core'

import { NextPageContext } from '../types'
import { IStaff, ISysAdmin, ITeacher } from '../types/auth'
import {
    INewTicketEvent,
    ITicket,
    ITicketEvent,
    ITicketEventFile
} from '../types/ticket'
import API from '../utils/api'
import { makeDocumentTitle, truncate } from '../utils/document'
import p from '../utils/pluralize'
import { getFileSizeStringFromBytes, getIconFromFileExtension } from '../utils/utils'

import Avatar from '../components/Avatar'
import ChipContainer from '../components/ChipContainer'
import Flexbox from '../components/Layout/Flexbox'
import Section from '../components/Layout/Section'
import TopBar from '../components/TopBar'

interface ITicketPageProps {
    ticket: ITicket
    ticketEvents: ITicketEvent[]
}

interface IReduxProps {
    teachers: Record<number, ITeacher>
    staff: Record<number, IStaff>
    sysadmin: Record<number, ISysAdmin>
}

interface IFile {
    file: File
    filesize: string
    status: 'loading' | 'done' | 'error'
    progress: number
    removed: boolean
}

const testTicket: ITicket = {
    id: 1,
    subject: 'Help I can\'t figure this out',
    userId: 5,
    assigneeId: 50,
    status: 'OPEN'
}

const testEvents: ITicketEvent[] = [
    { id: 1, ticketId: 1, userId: 1, message: 'I mean ffs...' },
    { id: 2, ticketId: 1, userId: 50, message: 'Tried turning it off and on again?', files: [
        {id: 1, size: 106000, name: 'Google', path: 'http://google.ca/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png'},
        {id: 2, size: 20000000, name: 'name', path: 'https://m.media-amazon.com/images/I/41ApQcPYhhL._AC_SL260_.jpg'},
    ] },
    { id: 3, ticketId: 1, userId: 1, message: 'Um yes?' },
]

const exampleProps: ITicketPageProps = { ticket: testTicket, ticketEvents: testEvents }

const useStyles = makeStyles((theme: Theme) => createStyles({
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
        flex: '0',
        width: '100%',
    },
    entry: {
        padding: `${theme.spacing(2)}px ${theme.spacing(2)}px`
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
    }
}))

const TicketPage = (props: ITicketPageProps & IReduxProps) => {
    const classes = useStyles()
    const { ticket, ticketEvents } = exampleProps
    const [inputValue, setInputValue] = React.useState('')
    const [fileStatuses, setFileStatuses]: [IFile[], React.Dispatch<React.SetStateAction<IFile[]>>] = React.useState([])

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const { value } = event.target
        setInputValue(value)
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        //
    }

    const handleDownload = (path: string) => {
        //
    }

    const handleUploadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        const { files } = event.target
        let previousFiles: IFile[] = []
        setFileStatuses(Array.from(files).map((file: File) => {
            const index: number = fileStatuses.length
            const filename: string = file.name
            return {
                file,
                filesize: getFileSizeStringFromBytes(file.size),
                status: 'loading',
                progress: 0,
                removed: false
            }
        }))

        fileStatuses.forEach((file: IFile) => {
            const formData: FormData = new FormData()
            formData.append('file', file)
            API.post('/tickets/file', file, {
                headers: { 'Content-Type': 'multipart/form-data' },
                onUploadProgress: (progressEvent: any) => {
                    previousFiles = [...fileStatuses]
                    console.log('previousFiles:', previousFiles)
                    console.log('fileStatuses:', fileStatuses)
                    console.log('before:', previousFiles[index])
                    previousFiles[index] = { ...previousFiles[index], progress: (100 * progressEvent.loaded) / progressEvent.total }
                    console.log('after:', previousFiles[index])
                    setFileStatuses(previousFiles)
                }
            }).then(() => {
                previousFiles = [...fileStatuses]
                previousFiles[index] = { ...previousFiles[index], status: 'done' }
                setFileStatuses(previousFiles)
            }, (error: any) => {
                previousFiles = [...fileStatuses]
                previousFiles[index] = { ...previousFiles[index], status: 'done' }
                setFileStatuses(previousFiles)
            })
        })
        // console.log('fileList:', files)
    }

    const handleRemoveFile = (index: number) => {
        //
    }

    return (
        <div>
            <Head><title>{makeDocumentTitle(truncate(ticket.subject, 20))}</title></Head>
            <Flexbox flexDirection='column' className={classes.root} disableSpacing>
                <TopBar title={ticket.subject}></TopBar>
                <Section className={classes.ticketEvents}>
                    <Flexbox flexDirection='column' disableSpacing>
                        {ticketEvents.map((ticketEvent: ITicketEvent) => {
                            const user: IUser = null
                            const hasFiles: boolean = ticketEvent.files && ticketEvent.files.length > 0
                            return (
                                <Flexbox key={ticketEvent.id} className={classes.ticketEvent} disableSpacing>
                                    <div className={classes.avatar}>
                                        <Avatar avatar={{ initials: 'CU', color: 'FF0000' }} />
                                    </div>
                                    <div className={classes.ticketEventBody}>
                                        <div className={classes.userDetails}>
                                            <Typography variant='h6'>Jeff Laird</Typography>
                                            <Flexbox>
                                                <Typography variant='body1'>Jan 5, 7:16 AM</Typography>
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
                                                    {ticketEvent.files.map((file: ITicketEventFile) => {
                                                        const fileParts: string[] = file.path.split('.')
                                                        const extension: string = fileParts[fileParts.length - 1]
                                                        return (
                                                            <li className={classes.file}>
                                                                <a>
                                                                    <IconButton onClick={() => handleDownload(file.path)} color='inherit'>
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
                <form className={classes.form} onSubmit={(e) => handleSubmit}>
                    {fileStatuses.length > 0 && (
                        <ChipContainer>
                            {fileStatuses.map((file: IFile, index: number) => {
                                const { filename } = file
                                console.log("F2_:", file)
                                const fileParts: string[] = filename.split('.')
                                const extension: string = fileParts[fileParts.length - 1]
                                return (
                                    <Chip
                                        avatar={
                                            <MuiAvatar>
                                                {file.status === 'error' && (
                                                    <Icon>error</Icon>
                                                )}
                                                {file.status === 'done' && (
                                                    <Icon>{getIconFromFileExtension(extension)}</Icon>
                                                )}
                                                {file.status === 'loading' && (
                                                    <CircularProgress variant='static' value={file.progress} />
                                                )}
                                            </MuiAvatar>
                                        }
                                        label={`${file.filename} (${file.fileSize})`}
                                        onDelete={() => handleRemoveFile(index)}
                                    />
                                    )
                            })}
                        </ChipContainer>
                    )}
                    <Flexbox className={classes.entry} flexDirection='row'>
                        <div className={classes.entryAction}>
                            <Tooltip title='Add attachments'>
                                <IconButton component='label'>
                                    <input
                                        type='file'
                                        onChange={handleUploadFile}
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
                            onChange={handleChange}
                        />
                        <div className={classes.entryAction}>
                            <Button type='submit' color='primary' disabled={inputValue.length === 0}>Send</Button>
                        </div>
                    </Flexbox>
                </form>
            </Flexbox>
        </div>
    )
}

TicketPage.getInitialProps = async (context: NextPageContext) => {
    return {}
}

export default TicketPage
