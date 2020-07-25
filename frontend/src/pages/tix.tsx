import Head from 'next/head'
import React from 'react'

import {
    Button,
    createStyles,
    Icon,
    IconButton,
    makeStyles,
    TextField,
    Theme,
    Typography
} from '@material-ui/core'

import {
    INewTicketEvent,
    ITicket,
    ITicketEvent,
    ITicketEventFile
} from '../types/ticket'
import { makeDocumentTitle, truncate } from '../utils/document'

import Avatar from '../components/Avatar'
import Flexbox from '../components/Layout/Flexbox'
import Section from '../components/Layout/Section'
import TopBar from '../components/TopBar'
import { NextPageContext } from 'src/types'

interface ITicketPageProps {
    ticket: ITicket
    ticketEvents: ITicketEvent[]
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
    { id: 2, ticketId: 1, userId: 50, message: 'Tried turning it off and on again?' },
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
        overflowX: 'auto'
    },
    form: {
        flex: '0',
        width: '100%',
    },
    entry: {
        padding: theme.spacing(1)
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
        width: '100%'
    },
    ticketEventBody: {
        flex: '1',
        // width: '100%',
        paddingLeft: theme.spacing(2)
    }
}))

const TicketPage = (props: ITicketPageProps) => {
    const classes = useStyles()
    const { ticket, ticketEvents } = exampleProps
    const [inputValue, setInputValue] = React.useState('')

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const { value } = event.target
        setInputValue(value)
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        //
    }

    return (
        <div>
            <Head><title>{makeDocumentTitle(truncate(ticket.subject, 20))}</title></Head>
            <Flexbox flexDirection='column' className={classes.root} disableSpacing>
                <TopBar title='Student Check-in'></TopBar>
                <Section className={classes.ticketEvents}>
                    <Flexbox flexDirection='column' disableSpacing>
                        {ticketEvents.map((ticketEvent: ITicketEvent) => {
                            return (
                                <Flexbox key={ticketEvent.id} className={classes.ticketEvent} disableSpacing>
                                    <Avatar avatar={{ initials: 'CU', color: 'FF0000' }} />
                                    <div className={classes.ticketEventBody}>
                                        <div>
                                            <Typography variant='h6'>Jeff Laird</Typography>
                                            <Typography variant='caption'>Jan 31, 2020</Typography>
                                        </div>
                                        <Typography variant='body1'>{ticketEvent.message}</Typography>
                                    </div>
                                </Flexbox>
                            )
                        })}
                    </Flexbox>
                </Section>
                <form className={classes.form} onSubmit={(e) => handleSubmit}>
                    <Flexbox className={classes.entry} flexDirection='row'>
                        <div className={classes.entryAction}>
                            <IconButton><Icon>add</Icon></IconButton>
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
                            <Button type='submit'>Send</Button>
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
