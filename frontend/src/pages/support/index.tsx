import { NextPage } from 'next'
import React from 'react'
import { connect } from 'react-redux'
import { fetchTickets } from '../../actions/ticketActions'
import withAuth from '../../hocs/withAuth'
import { NextPageContext } from '../../types'
import { ITicket } from '../../types/ticket'
import Table from '../../components/Table/EnhancedTable'

interface IReduxProps {
    fetchTickets: () => Promise<any>
}

interface ISupportTableData {
    subject : string
}

const supportTableColumns = {
    subject : { label : 'Subject', type : 'string', primary: true, searchable : true, filterable : true}
}


interface ISupportProps extends IReduxProps {
    tickets: ITicket[]
}

const Support : NextPage<ISupportProps> = (props : ISupportProps) => {
    const data = props.tickets.map(ticket => ({subject: ticket.title}))
    console.log('props',props)
    return (
        <>
        <div><h1>Current Tickets</h1></div>
        <Table 
        columns={supportTableColumns} 
        title={'My Support Tickets :^)'} 
        data={data}
        selected={[]}
        onSelect={() => null}/> 
        </>
    )

}

Support.getInitialProps = async(context: NextPageContext) => {
        const { store } = context
        return await store.dispatch(fetchTickets())
}

const mapStateToProps = (state: any) => ({
    tickets: state.tickets.tickets
})

const mapDispatchToProps = { fetchTickets }
export default withAuth('staff', 'teacher', 'sysadmin')(connect(mapStateToProps, mapDispatchToProps)(Support))