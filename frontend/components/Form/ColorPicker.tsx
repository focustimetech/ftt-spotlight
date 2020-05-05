import React from 'react'

import { Icon, Menu, Tooltip } from '@material-ui/core'

import { COLORS } from '../../theme'

interface IColorPickerProps {
    anchorEl: Element
    value: string
    onChange: (hex: string) => void
    onClose: () => void
}

export const randomColor = (): string => {
    const colors: string[] = Object.keys(COLORS)
    return colors[Math.floor(Math.random() * colors.length)]
}


class ColorPicker extends React.Component<IColorPickerProps> {
    render() {
        const open: boolean = Boolean(this.props.anchorEl)
        const colors: string[] = Object.keys(COLORS)

        return (
            <Menu className='color-picker' open={open} anchorEl={this.props.anchorEl} onClose={this.props.onClose}>
                {colors.map((hex: string) => (
                    <Tooltip title={COLORS[hex]} placement='bottom-start'>
                        <a onClick={() => this.props.onChange(hex)}>
                            <li className='color-picker__swatch' style={{ background: hex }}>
                                {this.props.value === hex && (
                                    <Icon>check</Icon>
                                )}
                            </li>
                        </a>
                    </Tooltip>
                ))}
            </Menu>
        )
    }
}

export default ColorPicker
