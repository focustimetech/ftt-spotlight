import React from 'react'
import { NavLink } from 'react-router-dom'

import {
	Icon,
	IconButton,
	ListItemIcon
} from '@material-ui/core'

interface IProps {
	to: string
	icon: string
	label: string
}

export class MenuItem extends React.Component<IProps> {
	render() {
		return (
			<NavLink className='menu_list__link' activeClassName='--selected' to={this.props.to}>
				<li className='list_item'>
					<ListItemIcon className='list_item__icon'><Icon>{this.props.icon}</Icon></ListItemIcon>
					<span>{this.props.label}</span>
				</li>
			</NavLink>
		)
	}
}
