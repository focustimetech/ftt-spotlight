import * as React from 'react'

import Icon from '@material-ui/core/Icon'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import { NavLink } from 'react-router-dom'

interface IProps {
	to: string
	icon: string
	label: string
	inactive?: boolean
}

const MenuItem = (props: IProps) => {
	return (
		<NavLink className='menu_list__link' activeClassName={props.inactive ? undefined : '--selected'} to={props.to}>
			<li className='list_item'>
				<ListItemIcon className='list_item__icon'><Icon>{props.icon}</Icon></ListItemIcon>
				<span>{props.label}</span>
			</li>
		</NavLink>
	)
}

export { MenuItem }
