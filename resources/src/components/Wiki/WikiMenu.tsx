import React from 'react'

import { ListItem } from '@material-ui/core'

import { MenuItem } from '../Sidebar/MenuItem'

interface IProps {
    children?: any
}

const WikiMenu = (props: IProps) => {
    return (
        <ul className='menu_list'>
            {props.children}
            <MenuItem inactive to='/' icon='chevron_left' label='Back to Spotlight' />
            <ListItem>Item 1</ListItem>
            <ListItem>Item 2</ListItem>
            <ListItem>Item 3</ListItem>
        </ul>
    )
}

export { WikiMenu }
