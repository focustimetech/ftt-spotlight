import classNames from 'classnames'
import * as React from 'react'

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@material-ui/core'

import { COLORS, IColor, TopicColor } from '../../theme'

interface IProps {
    open: boolean
    selected: TopicColor
    onClose: () => void
    onSelect: (color: TopicColor) => void
}

export const ColorsDialog = (props: IProps) => {
    const [selected, setSelected]: [TopicColor, React.Dispatch<React.SetStateAction<TopicColor>>]
        = React.useState(props.selected)

    const onColorClick = (color: TopicColor) => {
        setSelected(color)
    }

    const onExited = () => {
        setSelected(props.selected)
    }

    const handleSelect = () => {
        props.onSelect(selected)
        props.onClose()
    }

    return (
        <Dialog className='colors_dialog' open={props.open} onExited={onExited}>
            <DialogTitle>Choose Color</DialogTitle>
            <DialogContent>
                <DialogContentText>Choose from one of the colors below.</DialogContentText>
                <div className='colors_dialog__colors'>
                    {COLORS.map((color: IColor) => (
                        <div
                            onClick={() => onColorClick(color.name)}
                            className={classNames('color', {['--selected']: color.name === selected})}
                        >
                            <div className={classNames('color__swatch', `--${color.name}`)} />
                            <p className='color__name'>{color.label}</p>
                        </div>
                    ))}
                </div>
            </DialogContent>
            <DialogActions>
                <Button variant='contained' color='primary' onClick={() => handleSelect()}>Select</Button>
                <Button variant='text' onClick={() => props.onClose()}>Cancel</Button>
            </DialogActions>
        </Dialog>
    )
}
