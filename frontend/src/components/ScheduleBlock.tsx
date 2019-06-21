import * as React from 'react'
import * as classNames from 'classnames'

import { BlockDetails } from './Schedule'
import { Badge, ButtonBase, Card, CardActionArea, CardContent } from '@material-ui/core'
// import ButtonBase from '@material-ui/core/ButtonBase';

interface IProps {
    id: number
    badgeCount: number
    title: string
    details: BlockDetails
    memo?: string
    variant?: string
    onClick: (blockDetails: BlockDetails) => void
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