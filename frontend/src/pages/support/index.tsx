import { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import { connect } from 'react-redux'

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle
} from '@material-ui/core'

import { fetchTickets } from '../../actions/ticketActions'
import { NextPageContext } from '../../types'
import { TableColumns } from '../../types/table'
import { ITicket } from '../../types/ticket'
import { makeDocumentTitle } from '../../utils/document'

import Section from '../../components/Layout/Section'
import Table from '../../components/Table/EnhancedTable'
import TopBar from '../../components/TopBar'
import withAuth from '../../hocs/withAuth'

interface IReduxProps {
    fetchTickets: () => Promise<any>
}

interface ISupportTableData {
    subject: string
}

const supportTableColumns: TableColumns<ISupportTableData> = {
    subject: { label : 'Subject', type : 'string', primary: true, searchable : true, filterable : true}
}

interface ISupportProps extends IReduxProps {
    tickets: ITicket[]
}

const Support: NextPage<ISupportProps> = (props: ISupportProps) => {
    const [dialogOpen, setDialogOpen] = React.useState(false)

    const tableData: ISupportTableData[] = props.tickets.map((ticket: ITicket) => {
        return {
            subject: ticket.subject
        }
    })

    return (
        <div>
            <Head>{makeDocumentTitle('Support')}</Head>
            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
                <DialogTitle>Create Ticket</DialogTitle>
                <DialogContent>
                    Hello
                </DialogContent>
            </Dialog>
            <TopBar title='Support Tickets'>
                <Button color='primary' variant='text' onClick={() => setDialogOpen(true)}>Create Ticket</Button>
            </TopBar>
            <Section fullWidth>
                <Table<ISupportTableData>
                    columns={supportTableColumns}
                    // title={'My Support Tickets :^)'}
                    data={tableData}
                    selected={[]}
                    onSelect={() => null}
                />
            </Section>
        </div>
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