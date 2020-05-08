import React from 'react'

import { Button } from '@material-ui/core'

import ColorPicker, { randomColor } from '../components/Form/ColorPicker'
import CalendarContextMenu from '../components/Calendar/CalendarContextMenu'

export default () => {
    const [ref, setRef] = React.useState(null)
    const [value, setValue] = React.useState(randomColor())

    return (
        <div>
            <Button onClick={e => setRef(e.currentTarget)}>Test</Button>
            <CalendarContextMenu
                anchorEl={ref}
                onClose={() => setRef(null)}
                date={new Date()}
                event={{
                    label: 'Focus Block',
                    title: 'Science Fair Project',
                    color: '0000FF',
                    startTime: '00:00:00',
                    endTime: '09:00:00',
                    location: {
                        id: 1,
                        name: 'A201',
                        capacity: 30,
                        owner: null
                    }
                }}
                context={{
                    airCheckIns: 3,
                    appointments: 6,
                    ledgerEntries: 5,
                    missedAppointment: true,
                    plans: 15
                }}
            />
        </div>
    )
}
