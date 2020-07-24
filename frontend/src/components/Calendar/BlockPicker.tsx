import classNames from 'classnames'
import { addDays, differenceInSeconds, format, formatDistance, subDays } from 'date-fns'
import React from 'react'
import { connect } from 'react-redux'

import {
    createStyles,
    FormControl,
    InputLabel,
    ListItemText,
    makeStyles,
    MenuItem,
    Select,
    Theme,
    Typography
} from '@material-ui/core'

import { fetchBlocks } from '../../actions/blockActions'
import { IBlock } from '../../types/calendar'
import { ITopic } from '../../types/topic'

import Flexbox from '../Layout/Flexbox'

interface IReduxProps {
    blocks: IBlock[]
}

export interface IBlockPickerProps {
    date: Date
    blockId: number
    showTimeDiff?: boolean
    topics?: Record<number, ITopic>
    getBlockDisabled?: (block: IBlock) => boolean
    onSelectBlock: (event: React.ChangeEvent<{ name?: string, value: number }>) => void
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        minWidth: 120
    }
}))

const BlockPicker = (props: IBlockPickerProps & IReduxProps) => {

    const classes = useStyles()
    const { date, blockId, onSelectBlock, showTimeDiff, topics, getBlockDisabled } = props
    const weekDay: number = Number(format(date, 'i'))
    const blocks: IBlock[] = props.blocks.filter((block: IBlock) => block.weekDay === weekDay)
    const currentBlock: IBlock = blocks.find((block: IBlock) => block.id === blockId)
    const now: Date = new Date()
    let blockStartDate: Date = null
    let blockEndDate: Date = null
    let blockHasStarted: boolean = false
    let blockHasEnded: boolean = false
    let blockIsPending: boolean = false

    if (currentBlock) {
        blockStartDate = new Date(`${date.toDateString()} ${currentBlock.startTime}`)
        blockEndDate = new Date(`${date.toDateString()} ${currentBlock.endTime}`)
        blockHasEnded = blockEndDate < now
        blockHasStarted = blockStartDate < now
        blockIsPending = blockHasStarted && !blockHasEnded
    }

    return (
        <Flexbox flexDirection='column' alignItems='flex-end' className='block-picker'>
            <div>
                <FormControl className={classes.root} variant='outlined' margin='dense'>
                    <InputLabel id='check-in-block-label'>Block</InputLabel>
                    <Select
                        labelId='check-in-block-label'
                        variant='outlined'
                        value={blockId === -1 ? '' : blockId}
                        onChange={onSelectBlock}
                        label='Block'
                        disabled={!blocks || blocks.length <= 1}
                        renderValue={(id: number) => {
                            const block: IBlock = blocks.find((b: IBlock) => b.id === id)
                            return block ? block.label : ''
                        }}
                    >
                        {blocks.map((block: IBlock) => (
                            <MenuItem value={block.id} disabled={getBlockDisabled && getBlockDisabled(block)}>
                                <ListItemText primary={block.label} secondary={topics && topics[block.id] ? topics[block.id].memo : 'No Topic scheduled'} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
            {blockStartDate && blockEndDate && showTimeDiff !== false && (
                <Typography variant='caption' className={classNames('date-block-picker__block-timing', { '--pending': blockIsPending })}>
                    {blockHasEnded
                        ? `Ended ${formatDistance(now, blockEndDate)} ago`
                        : (!blockHasStarted ? `Starts in ${formatDistance(now, blockStartDate)}` : (
                            differenceInSeconds(now, blockStartDate) < differenceInSeconds(now, blockEndDate)
                                ? `Started ${formatDistance(now, blockStartDate)} ago`
                                : `Ends in ${formatDistance(now, blockEndDate)}`
                        ))
                    }
                </Typography>
            )}
        </Flexbox>
    )
}

const mapStateToProps = (state: any) => ({
    blocks: state.blocks.items
})

const mapDispatchToProps = { fetchBlocks }

export default connect(mapStateToProps, mapDispatchToProps)(BlockPicker)
