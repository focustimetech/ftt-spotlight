import classNames from 'classnames'
import React from 'react'

import { ILayoutContainerProps, Orientation } from '../../types/layout'

const LayoutContainer = (props: ILayoutContainerProps & { orientation: Orientation }) => {
    return (
        <div className={classNames('layout', { '--vertical': props.orientation === 'vertical', '--horizontal': props.orientation === 'horizontal'})}>
            {props.children}
        </div>
    )
}

export default LayoutContainer
