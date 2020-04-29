import React from 'react'

import {
    Menu
} from '@material-ui/core'

interface IContextMenuProps {
    open: boolean
}

const ContextMenu = (props: IContextMenuProps) => {
    return (
        <Menu className='context-menu' open={props.open} />
    )
}

export default ContextMenu
