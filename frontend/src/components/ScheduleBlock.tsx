import * as React from 'react'
import * as classNames from 'classnames'

import { Card, CardActionArea, CardContent } from '@material-ui/core'
import ButtonBase from '@material-ui/core/ButtonBase';

interface IProps {
    title: string
    label?: string
    memo?: string
    variant?: string
}
export const ScheduleBlock = (props: IProps) => {
    const { label, memo, title, variant } = props
    return (
        <Card className='block'>
            <CardActionArea className={classNames('block__inner', {[`--${variant}`]: variant})}>
                <CardContent className='block__content'>
                    <h6 className='block__label'>{label || 'No Label'}</h6>
                    <p className='block__title'>{title}</p>
                    {memo && <p className='block__memo'>{memo}</p>}
                </CardContent>
            </CardActionArea>
        </Card>
        
    )
}