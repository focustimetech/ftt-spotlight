import React from 'react'

import {
    Drawer,
    Icon,
    IconButton
} from '@material-ui/core'

interface IDrawerProps {
    open: boolean
    children?: any
    keepMounted?: boolean
}

const ModalDrawer = (props: IDrawerProps) => {
    return (
        <Drawer keepMounted={props.keepMounted} open={props.open} variant='temporary'>
            <div className='drawer'>
                {props.children}
            </div>
        </Drawer>
    )
}

export default ModalDrawer
export { DrawerContent } from './DrawerContent'
export { DrawerTitle } from './DrawerTitle'
