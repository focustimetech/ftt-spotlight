import React from 'react'

interface IFormRowProps {
    children: any
}

interface IFormProps {
    children: any
}

export const FormRow = (props: IFormRowProps) => {
    return (
        <div className='form-row'>{props.children}</div>
    )
}

const Form = (props: IFormProps) => {
    return (
        <div className='form'>{props.children}</div>
    )
}

export default Form
