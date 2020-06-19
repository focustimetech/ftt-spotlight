import classNames from 'classnames'
import React from 'react'

const ListFormContent = (props: React.FormHTMLAttributes<HTMLFormElement>) => {
    const { className, children } = props
    return (
        <div className={classNames('list-form__content', className)}>
            {children}
        </div>
    )
}

export default ListFormContent
