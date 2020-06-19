import classNames from 'classnames'
import React from 'react'

import MenuList, { MenuListProps } from '@material-ui/core/MenuList'

const ListFormList = (props: MenuListProps) => {
    const { className, children, ...rest } = props
    return (
        <MenuList {...rest} className={classNames('list-form__list', className)}>
            {children}
        </MenuList>
    )
}

export default ListFormHeader
