import * as React from 'react'

interface IProps {
    label: string
    variant: string
}
export const ScheduleBlock = (props: IProps) => {
    return (
        <div className='block --attended'>{props.label}</div>
    )
}