import React from 'react'

import { Button } from '@material-ui/core'

import ColorPicker, { randomColor } from '../components/Form/Pickers/ColorPicker'
import CalendarContextMenu from '../components/Calendar/CalendarContextMenu'
import TopicsForm from '../components/Form/Forms/TopicsForm'

export default () => {
    const [ref, setRef] = React.useState(null)
    const [value, setValue] = React.useState(randomColor())

    return (
        <div>
            <Button className='test' onClick={e => setRef(e.currentTarget)}>Test</Button>
            <TopicsForm />
        </div>
    )
}
