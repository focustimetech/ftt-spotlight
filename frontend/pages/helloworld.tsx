import React from 'react'

import { Button, Chip, Typography } from '@material-ui/core'

import ColorPicker, { randomColor } from '../components/Form/Pickers/ColorPicker'
import CalendarContextMenu from '../components/Calendar/CalendarContextMenu'
import TopicsForm from '../components/Form/Forms/TopicsForm'

import EnhancedTable from '../components/Table/EnhancedTable'
import { ITableColumn, TableColumns } from '../types/table'

type TicketStatus =
    | 'Resolved'
    | 'Open'
    | 'Closed'
    | 'Awaiting Response'

interface IPersonData {
    name: string
    age: number
    status: TicketStatus
    birthday: Date
    verified: boolean
}

const chipComponent = (value: TicketStatus) => {
    let background: string
    let color: string = 'inherit'
    switch (value) {
        case 'Resolved':
            background = '#DDD'
            break
        case 'Open':
            background = '#4CAF50'
            color = '#FFF'
            break
        case 'Closed':
            background = '#DDD'
            break
        case 'Awaiting Response':
            background = '#1976D2'
            color = '#FFF'
            break
    }
    return (
        <Chip style={{ color, background }} label={
            <Typography variant='inherit'>{value}</Typography>
        } />
    )
}

const personTableColumns: TableColumns<IPersonData> = {
    name: { label: 'Name', type: 'string', primary: true, searchable: true, filterable: true },
    age: { label: 'Age', type: 'number', searchable: true, filterable: true },
    status: { component: value => chipComponent(value), label: 'Status', type: 'enum', searchable: false, filterable: true, values: ['OPEN', 'RESOLVED', 'CLOSED', 'AWAIT'] },
    birthday: { label: 'Birthday', type: 'date', filterable: true },
    verified: { label: 'Verified', type: 'enum', filterable: true, hidden: true, values: ['Verified', 'Not verified'] }
}

const tableData: IPersonData[] = [
    { name: 'Graham', age: 20, status: 'Open', birthday: new Date(1999, 8, 11), verified: false },
    { name: 'Brayden', age: 21, status: 'Resolved', birthday: new Date(1999, 2, 4), verified: true },
    { name: 'Kai', age: 21, status: 'Closed', birthday: new Date(1999, 1, 6), verified: true },
    { name: 'Curtis', age: 21, status: 'Awaiting Response', birthday: new Date(1999, 1, 19), verified: true },
]

export default () => {
    const [selected, setSelected] = React.useState([])

    return (
        <div style={{ padding: 64, boxSizing: 'border-box', background: '#EEE' }}>
            <EnhancedTable<IPersonData>
                title='User Accounts'
                data={tableData}
                columns={personTableColumns}
                selected={selected}
                onSelect={setSelected} 
            />
        </div>
    )
}
