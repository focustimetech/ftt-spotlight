import classNames from 'classnames'
import React from 'react'

import {
    FormControl,
    Icon,
    InputLabel,
    MenuItem,
    Select,
    Tooltip
} from '@material-ui/core'
import { FormControlProps } from '@material-ui/core/FormControl'

import { COLORS } from '../../../theme'

interface IColorPickerProps extends Pick<FormControlProps, 'variant' | 'margin'> {
    value: string
    onChange: (hex: string) => void
}

export const randomColor = (): string => {
    const colors: string[] = Object.keys(COLORS)
    return colors[Math.floor(Math.random() * colors.length)]
}

class ColorPicker extends React.Component<IColorPickerProps> {
    render() {
        const selectValue = this.props.value || '#DDD' // Used as a fallback
        const colors: string[] = Object.keys(COLORS)

        return (
            <FormControl className='color-picker' variant={this.props.variant} margin={this.props.margin}>
                <InputLabel id='color-picker-label'>Color</InputLabel>
                <Select
                    value={selectValue}
                    labelId='color-picker-label'
                    MenuProps={{ className: 'color-picker__list', disablePortal: true }}
                    label='Color'
                    renderValue={(value: any) => (
                        <div className={classNames('color-picker__swatch', '--select-value')} style={{ background: this.props.value }} />
                    )}
                >
                    {colors.map((hex: string) => (
                        <Tooltip title={COLORS[hex]} placement='bottom-start'>
                            <MenuItem button={false} className='color-picker__swatch' style={{ background: hex }} value={hex} onClick={() => this.props.onChange(hex)}>
                                {this.props.value === hex && (
                                    <Icon>check</Icon>
                                )}
                            </MenuItem>
                        </Tooltip>
                    ))}
                </Select>
            </FormControl>
        )
    }
}

export default ColorPicker
