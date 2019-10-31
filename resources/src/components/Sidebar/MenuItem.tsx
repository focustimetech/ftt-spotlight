import * as React from 'react'
import { NavLink } from 'react-router-dom'

import { Icon, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'


interface IProps {
	icon: string
	label: string
	inactive?: boolean
	to?: string
}

const MenuItem = (props: IProps) => {
	const MenuItemContent = () => (
		<li className='list_item'>
			<ListItemIcon className='list_item__icon'><Icon>{props.icon}</Icon></ListItemIcon>
			<ListItemText>{props.label}</ListItemText>
		</li>
	)
	
	return props.to ? (
		<NavLink className='menu_list__link' activeClassName={props.inactive ? undefined : '--selected'} to={props.to}>
			<MenuItemContent />
		</NavLink>
	) : (
		<MenuItemContent />
	)
}

export { MenuItem }
