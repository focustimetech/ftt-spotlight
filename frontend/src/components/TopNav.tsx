import * as React from 'react'

import FormControl from '@material-ui/core/FormControl'
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import MenuItem from '@material-ui/core/MenuItem'
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Select from '@material-ui/core/Select'

import { RouteOption } from '../types/app'

interface IProps {
	title?: string
	onMenuClick?: (e: any) => void
	routeOptions?: RouteOption[]
	children?: any
}

/**
 * TopNav for the main app view. `props.children` Takes `<li>` elements only.
 */
export const TopNav = (props: IProps) => {
	return (
		<>
			<div className='top-nav'>
				{props.onMenuClick && (
					<IconButton className='top-nav_menu' onClick={props.onMenuClick}><Icon>menu</Icon></IconButton>
				)}
				{props.title && (
					<h3 className='top-nav__title'>{props.title}</h3>
				)}
				{props.children && (
					<ul>{props.children}</ul>
				)}
			</div>
		</>
	)
}