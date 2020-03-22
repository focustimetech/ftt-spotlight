import classNames from 'classnames'
import React from 'react'

import { Typography } from '@material-ui/core'

interface IProps {
    children: any
    open: boolean
    title: string
}

const Drawer = (props: IProps) => {
    return (
        <div className={classNames('drawer', { '--open': props.open })}>
            <div className='drawer__topbar'>
                <Typography variant='h6'>{props.title}</Typography>
            </div>
            <div className='drawer__content'>
                {props.children}
            </div>
        </div>
    )
}

export { Drawer }
