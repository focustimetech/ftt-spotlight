import * as React from 'react'
import * as classNames from 'classnames'

import {
    Badge,
    Card,
    CardActionArea,
    CardContent
} from '@material-ui/core'

import { ICalendarBlock, IBlockDetails } from '../../types/calendar'

interface IProps extends ICalendarBlock {
    onClick: (blockDetails: IBlockDetails) => void
}

export const CalendarBlock = (props: IProps) => {
    const { memo, title, variant, badgeCount, voided } = props
    const { label } = props.details

    return (
        <Badge badgeContent={badgeCount} invisible={badgeCount === 0} color='secondary' max={9} className='block__badge'>
            <Card className='block'>
                <CardActionArea
                    className={classNames('block__inner', {[`--${variant}`]: variant}, {['--void']: voided})}
                    onClick={() => props.onClick(props.details)}
                >
                    <CardContent className='block__content'>
                        <h6 className='block__label'>{label || 'No Label'}</h6>
                        <p className='block__title'>{title}</p>
                        {memo && (
                            <p className='block__memo'>{memo}</p>
                        )}
                    </CardContent>
                </CardActionArea>
            </Card>
        </Badge>
    )
}
