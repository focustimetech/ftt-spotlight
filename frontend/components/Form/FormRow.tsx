import classNames from 'classnames'
import React from 'react'

import Flexbox, { IFlexboxProps } from '../Layout/Flexbox'

const FormRow = (props: IFlexboxProps) => {
    const { children, className, ...rest } = props
    return (
        <Flexbox className={classNames('form__row', className)} {...rest}>
            {children}
        </Flexbox>
    )
}

export default FormRow
