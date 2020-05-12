import classNames from 'classnames'
import React from 'react'

const Form = (props: React.FormHTMLAttributes<HTMLFormElement>) => {
    const { children, className, ...rest } = props
    return (
        <form {...rest} className={classNames('form', className)}>
            {props.children}
        </form>
    )
}

export default Form
export { FormRow } from './FormRow'
export { FormRowElement } from './FormRowElement'
