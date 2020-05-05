import React from 'react'

import { Button } from '@material-ui/core'

import ColorPicker, { randomColor } from '../components/Form/ColorPicker'

export default () => {
    const [ref, setRef] = React.useState(null)
    const [value, setValue] = React.useState(randomColor())

    return (
        <div>
            <Button onClick={e => setRef(e.currentTarget)}>Test</Button>
            <ColorPicker value={value} onChange={setValue} anchorEl={ref} onClose={() => setRef(null)} />
        </div>
    )
}
