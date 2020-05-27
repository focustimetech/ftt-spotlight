import classNames from 'classnames'
import React from 'react'

import Button, { ButtonProps } from '@material-ui/core/Button'
import { ArrowDropDown, ArrowDropUp } from '@material-ui/icons'

interface IButtonSelectProps extends ButtonProps {
    children: any
    open: boolean
}

const ButtonSelect = (props: IButtonSelectProps) => {
    const { children, className, open, endIcon, ...rest } = props
    return (
        <Button
            className={classNames(className, 'button-select')}
            endIcon={endIcon || open ? <ArrowDropUp className='button-select__icon'/> : <ArrowDropDown className='button-select__icon'/>}
            {...rest}
        >
            {children}
        </Button>
    )
}

export default ButtonSelect
