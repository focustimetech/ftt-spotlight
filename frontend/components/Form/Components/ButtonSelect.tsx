import React from 'react'

import Button, { ButtonProps } from '@material-ui/core/Button'
import { ArrowDropDown, ArrowDropUp } from '@material-ui/icons'

interface IButtonSelectProps extends ButtonProps {
    children: any
    open: boolean
}

const ButtonSelect = (props: IButtonSelectProps) => {
    const { children, open, endIcon, ...rest } = props
    return (
        <Button {...rest} endIcon={endIcon || open ? <ArrowDropUp /> : <ArrowDropDown />}>
            {children}
        </Button>
    )
}

export default ButtonSelect
