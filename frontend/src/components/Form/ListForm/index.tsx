import classNames from 'classnames'
import React from 'react'

import Paper, { PaperProps } from '@material-ui/core/Paper'

import Form, { IFormProps } from '../'

interface IListFormProps extends IFormProps {
    PaperProps?: PaperProps
}

class ListForm extends React.Component<IListFormProps> {
    render() {
        const { PaperProps, ...ListFormProps } = this.props
        return (
            <Paper {...PaperProps} className={classNames('list-form', PaperProps && PaperProps.className)}>
                <Form {...ListFormProps } className={classNames('list-form__form', this.props.className)}>
                    {this.props.children}
                </Form>
            </Paper>
        )
    }
}

export default ListForm
export { ListFormActionArea } from './ListFormActionArea'
export { ListFormContent } from './ListFormContent'
export { ListFormEmptyState } from './ListFormEmptyState'
export { ListFormHeader } from './ListFormHeader'
export { ListFormList } from './ListFormList'
