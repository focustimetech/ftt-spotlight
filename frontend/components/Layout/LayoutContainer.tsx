import classNames from 'classnames'
import React from 'react'

import { ILayoutProps, Orientation } from '../../types/layout'

const LayoutContainer = (props: ILayoutProps & { orientation: Orientation }) => {
    return (
        <div className={classNames('layout', { '--vertical': props.orientation === 'vertical', '--horizontal': props.orientation === 'horizontal'})}>
            {props.children}
        </div>
    )
}

export default LayoutContainer
