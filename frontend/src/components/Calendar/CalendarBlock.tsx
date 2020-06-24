import classNames from 'classnames'
import React from 'react'

import {
    Badge,
    Card,
    CardActionArea,
    CardContent,
    Typography
} from '@material-ui/core'

import { CardProps } from '@material-ui/core/Card'

import { ICalendarContextDetails, ICalendarEvent } from '../../types/calendar'

interface ICalendarBlocksProps extends ICalendarContextDetails, Omit<CardProps, 'onClick' | 'title'> {
    numLines: number
    onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const CalendarBlock = (props: ICalendarBlocksProps) => {
    const badgeCount = 0
    const { event, date, title, color, style, onClick, numLines, ...rest } = props
    const { label, startTime, endTime, context } = event
    const { top, height } = style
    // const contextDetails: ICalendarContextDetails = { event, title, date, color }
    let titleHeight: number
    if ((numLines === 4 && !context.location) || numLines === 5 || numLines === 6) {
        titleHeight = 30
    } else {
        titleHeight = numLines >= 7 ? 15 * (numLines - 4) : 15
    }

    if (color) {
        console.log('Found color:', color)
    }

    return (
        <div className='calendar-block' style={{ top }}>
            <Badge
                badgeContent={badgeCount}
                invisible={badgeCount === 0}
                color='secondary'
                max={9}
                className='calendar-block__badge'
            >
                <Card {...rest} className='calendar-block__card' style={color && { background: `#${color}`, color: '#FFF'}}>
                    <CardActionArea
                        className={classNames('calendar-block__inner')}
                        style={{ height }}
                        // onClick={(event) => onClick(event, contextDetails)}
                        onClick={onClick}
                    >
                        <CardContent className='calendar-block__content'>
                            <Typography variant='button' component='p' style={{ maxHeight: numLines >= 6 ? 30 : 15}}>
                                <span>[{numLines}]{label || 'Unlabeled Block'}</span>
                            </Typography>
                            {numLines >= 2 && (
                                <Typography variant='subtitle1' component='p' style={{ maxHeight: titleHeight }}>
                                    <span>{title}</span>
                                </Typography>
                            )}
                            {numLines >= 3 && (
                                <Typography variant='body1' component='p'>{`${startTime} – ${endTime}`}</Typography>
                            )}
                            {numLines >= 4 && context.location && (
                                <Typography variant='body1' component='p'>{context.location.name}</Typography>
                            )}
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Badge>
        </div>
    )
}

export default CalendarBlock
