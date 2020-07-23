import classNames from 'classnames'
import React from 'react'

import Flexbox from '../Layout/Flexbox'
import BlockPicker, { IBlockPickerProps } from './BlockPicker'
import CalendarHeader, { ICalendarHeaderProps } from './CalendarHeader'

const DateBlockPicker = (props: IBlockPickerProps & ICalendarHeaderProps) => {
    const { date, onSelectBlock, blockId, showTimeDiff, topics, getBlockDisabled, ...rest } = props
    return (
        <Flexbox className='date-block-picker' justifyContent='space-between' alignItems='flex-start'>
            <CalendarHeader
                date={date}
                {...rest}
            />
            <BlockPicker
                date={date}
                onSelectBlock={onSelectBlock}
                blockId={blockId}
                showTimeDiff={showTimeDiff}
                topics={topics}
                getBlockDisabled={getBlockDisabled}
            />
        </Flexbox>
    )
}

export default DateBlockPicker
