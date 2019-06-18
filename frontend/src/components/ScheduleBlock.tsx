import * as React from 'react'
import * as classNames from 'classnames'

import { BlockDetails } from './Schedule'
import { Card, CardActionArea, CardContent } from '@material-ui/core'
import ButtonBase from '@material-ui/core/ButtonBase';

interface IProps {
    id: number
    title: string
    details: BlockDetails
    memo?: string
    variant?: string
    onClick: (blockDetails: BlockDetails) => void
}

export const ScheduleBlock = (props: IProps) => {
    const { memo, title, variant, id } = props
    const { label } = props.details
    return (
        <Card className='block' key={id}>
            <CardActionArea className={classNames('block__inner', {[`--${variant}`]: variant})} onClick={() => props.onClick(props.details)}>
                <CardContent className='block__content'>
                    <h6 className='block__label'>{label || 'No Label'}</h6>
                    <p className='block__title'>{title}</p>
                    {memo && <p className='block__memo'>{memo}</p>}
                </CardContent>
            </CardActionArea>
        </Card>
    )
}