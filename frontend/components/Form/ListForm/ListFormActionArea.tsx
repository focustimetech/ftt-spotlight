import classNames from 'classnames'
import React from 'react'

import { Collapse, Divider } from '@material-ui/core'

interface IListFormActionAreaProps extends React.HTMLAttributes<HTMLDivElement> {
    visible: boolean
}

const ListFormActionArea = (props: IListFormActionAreaProps) => {
    const { className, children, visible, ...rest } = props
    return (
        <Collapse in={visible}>
            <div>
                <Divider />
                <div {...rest} className={classNames('list-form__action-area', className)}>
                    {children}
                </div>
            </div>
        </Collapse>
    )
}

export { ListFormActionArea }
