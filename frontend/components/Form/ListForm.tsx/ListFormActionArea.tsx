import classNames from 'classnames'
import React from 'react'

const ListFormActionArea = (props: React.FormHTMLAttributes<HTMLFormElement>) => {
    const { className, children } = props
    return (
        <div className={classNames('list-form__action-area', className)}>
            {children}
        </div>
    )
}

export default ListFormActionArea
