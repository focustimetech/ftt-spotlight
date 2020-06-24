import classNames from 'classnames'
import React from 'react'

interface IFormRowElementProps {
    children: any
    fullWidth?: boolean
}

const FormRowElement = (props: IFormRowElementProps) => {
    return (
        <div className={classNames('form__element', { '--fullwidth': props.fullWidth })}>
            {props.children}
        </div>
    )
}

export { FormRowElement }
