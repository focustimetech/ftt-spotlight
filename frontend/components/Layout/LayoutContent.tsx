import React from 'react'

import { Paper } from '@material-ui/core'

import { Orientation } from '../../types/layout'

interface ILayoutContentProps {
    children: any
    orientation: Orientation
}

const LayoutContent = (props: ILayoutContentProps) => {
    return (
        <Paper className='layout__content' elevation={props.orientation === 'vertical' ? 1 : 0}>
            {props.children}
        </Paper>
    )
}

export default LayoutContent
