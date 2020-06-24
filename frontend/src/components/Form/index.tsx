import classNames from 'classnames'
import React from 'react'

export type IFormProps = React.FormHTMLAttributes<HTMLFormElement>

const Form = (props: IFormProps) => {
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
