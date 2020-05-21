import React from 'react'

import { Button } from '@material-ui/core'

import ColorPicker, { randomColor } from '../components/Form/Pickers/ColorPicker'
import CalendarContextMenu from '../components/Calendar/CalendarContextMenu'
import TopicsForm from '../components/Form/Forms/TopicsForm'

import EnhancedTable from '../components/Table/EnhancedTable'
import { ITableColumn, TableColumns } from '../types/table'

interface IPersonData {
    name: string
    age: number
    birthday: Date
    verified: boolean
}

const personTableColumns: TableColumns<IPersonData> = {
    name: { label: 'Name', type: 'string', primary: true, searchable: true, filterable: true },
    age: { label: 'Age', type: 'number', searchable: true, filterable: true },
    birthday: { label: 'Birthday', type: 'date', filterable: true },
    verified: { label: 'Verified', type: 'enum', filterable: true, hidden: true, values: ['Verified', 'Not verified'] }
}

const tableData: IPersonData[] = [
    { name: 'Graham', age: 20, birthday: new Date('1999-08-11'), verified: false },
    { name: 'Brayden', age: 21, birthday: new Date('1999-02-20'), verified: true },
    { name: 'Kai', age: 21, birthday: new Date('1999-01-06'), verified: true },
    { name: 'Curtis', age: 21, birthday: new Date('1999-01-19'), verified: true },
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
