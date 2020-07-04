import classNames from 'classnames'
import React from 'react'

import Paper, { PaperProps } from '@material-ui/core/Paper'

import Form, { IFormProps } from '../'

class ListForm extends React.Component<IFormProps> {
    render() {
        const { className, ...rest} = this.props
        return (
            <div className='list-form'>
                <Form {...rest } className={classNames('list-form__form', className)}>
                    {this.props.children}
                </Form>
            </div>
        )
    }
}

export default ListForm
export { ListFormActionArea } from './ListFormActionArea'
export { ListFormContent } from './ListFormContent'
export { ListFormEmptyState } from './ListFormEmptyState'
export { ListFormHeader } from './ListFormHeader'
export { ListFormList } from './ListFormList'
