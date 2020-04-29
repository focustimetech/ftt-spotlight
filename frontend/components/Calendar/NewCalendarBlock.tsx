import classNames from 'classnames'
import React from 'react'

import {
    Badge,
    Card,
    CardActionArea,
    CardContent
} from '@material-ui/core'

import { CardProps } from '@material-ui/core/Card'

import { ICalendarEvent } from './NewCalendar'

type ICalendarBlocksProps = ICalendarEvent & CardProps

const CalendarBlock = (props: ICalendarBlocksProps) => {
    const badgeCount = 0
    const { style, title, label, description, color, onClick, startTime, endTime, ...rest } = props
    const { top, height } = style
    return (
        <div className='new-calendar-block' style={{ top }}>
            <Badge
                badgeContent={badgeCount}
                invisible={badgeCount === 0}
                color='secondary'
                max={9}
                className='new-calendar-block-badge'
            >
                <Card {...rest}>
                    <CardActionArea
                        className={classNames('new-calendar-block__inner')}
                        onClick={onClick}
                        style={{ height }}
                    >
                        <CardContent className='new-calendar-block__content'>
                            <h6 className='block-label'>{label || 'Unlabeled Block'}</h6>
                            <p>{`${startTime} - ${endTime}`}</p>
                            <p className='block-title'>{title}</p>
                            {description && (
                                <p className='block-description'>{description}</p>
                            )}
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Badge>
        </div>
    )
}

export default CalendarBlock
