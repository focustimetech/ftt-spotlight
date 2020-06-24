import classNames from 'classnames'
import React from 'react'

import { Collapse, Divider } from '@material-ui/core'

interface IListFormContentProps extends React.HTMLAttributes<HTMLDivElement> {
    visible: boolean
}

const ListFormContent = (props: IListFormContentProps) => {
    const { className, children, visible } = props
    return (
        <Collapse in={visible}>
            <div>
                <Divider />
                <div className={classNames('list-form__content', className)}>
                    {children}
                </div>
            </div>
        </Collapse>
    )
}

export { ListFormContent }
