import React from 'react'

import Calendar from '../components/calendar/NewCalendar'

const data = {
    '2020-04-14': {
        events: [],
        blocks: [
            {
                label: 'Focus Block',
                title: 'My class',
                description: 'My description',
                color: 'orange',
                onClick: () => null,
                startTime: '10:00:00',
                endTime: '11:00:00'
            }
        ]
    }
}

const CalendarTest = () => {
    return (
        <Calendar calendar={data} weekStartsOn={1} />
    )
}

export default CalendarTest
