import * as React from 'react'
import * as classNames from 'classnames'

import {
    Badge,
    Card,
    CardActionArea,
    CardContent
} from '@material-ui/core'

import { IBlockDetails } from '../../types/calendar'

interface IProps {
    id: number
    badgeCount: number
    title: string
    details: IBlockDetails
    memo?: string
    variant?: string
    onClick: (blockDetails: IBlockDetails) => void
}

export const ScheduleBlock = (props: IProps) => {
    const { memo, title, variant, id, badgeCount } = props
    const { label } = props.details
    return (
        <Badge badgeContent={badgeCount} invisible={badgeCount === 0} color='primary' max={9} className='block__badge'>
            <Card className='block' key={id}>
                <CardActionArea className={classNames('block__inner', {[`--${variant}`]: variant})} onClick={() => props.onClick(props.details)}>
                    <CardContent className='block__content'>
                        <h6 className='block__label'>{label || 'No Label'}</h6>
                        <p className='block__title'>{title}</p>
                        {memo && <p className='block__memo'>{memo}</p>}
                    </CardContent>
                </CardActionArea>
            </Card>
        </Badge>
    )
}
