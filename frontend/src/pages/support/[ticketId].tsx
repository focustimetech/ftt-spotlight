import React from 'react'
import { useRouter }  from 'next/router'
import { NextPageContext } from 'next'
import API from '../../utils/api'
import { AxiosResponse } from 'axios'
import { NextPage } from 'next'
import withAuth from '../../hocs/withAuth'
import { connect } from 'react-redux'
import { replyTicket, fetchTicketEvents } from '../../actions/ticketActions'



import { Button, TextField } from '@material-ui/core'
import { INewTicket, ITicketEvent, INewTicketEvent } from '../../types/ticket'


interface ITicketPageProps {
    ticketEvents : ITicketEvent[]
    replyTicket : (response : INewTicketEvent) => Promise<any>
    ticketId : number
}
const TicketPage:NextPage<ITicketPageProps> = (props : ITicketPageProps) => {
    const [inputVal, setInputValue] = React.useState("")
    const handleChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target
        setInputValue(value)
    }
    const handleSubmit = () => {
        const response : INewTicketEvent = {
            message : inputVal,
            action : 'OPEN',
            ticketId : props.ticketId

        }
        console.log("Created response ", response)
        props.replyTicket(response)
    }
return (
    <>
    <div>'WELCOME TO TICKETS'</div>
    {props.ticketEvents.map((ticketEvent : ITicketEvent) => (
        <div>
            <p> {ticketEvent.action} </p>
            <p> {ticketEvent.message} </p>
        </div>
    ))}
    <div>
        <form autoComplete='off'>
            <div>
                <TextField 
                    id="standard-multiline-static"
                    label="Reply"
                    multiline
                    rows={4}
                    fullWidth
                    defaultValue="I need help with..."
                    value={inputVal}
                    onChange={handleChange}
                />
            </div>
        </form>
        <Button onClick={() => handleSubmit()} variant='contained'>Send Response</Button>
    </div>

    
    </>
)
}

TicketPage.getInitialProps = async (context : NextPageContext) => {
    const { ticketId } = context.query
    const { store } = context
    return await store.dispatch(fetchTicketEvents(Number(ticketId))).catch((err : any) => {
        console.log("aaaa it erorr")
    }).then(() => {    return { ticketId : Number(ticketId) }
    })
}

const mapStateToProps = (state:any) => ({
    ticketEvents: state.tickets.ticketEvents
})

const mapDispatchToProps = { replyTicket }
export default withAuth('staff', 'teacher', 'sysadmin')(connect(mapStateToProps, mapDispatchToProps)(TicketPage))