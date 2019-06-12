import * as React from 'react'

import { Card, CardActionArea } from '@material-ui/core'

interface IProps {
    label: string
    variant?: string
}
export const ScheduleBlock = (props: IProps) => {
    return (
        <Card>
            <CardActionArea className='block --attended'>{props.label}</CardActionArea>
        </Card>
    )
}