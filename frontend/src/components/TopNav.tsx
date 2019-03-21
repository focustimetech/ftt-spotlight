import * as React from 'react'

import FormControl from '@material-ui/core/FormControl'
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import MenuItem from '@material-ui/core/MenuItem'
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Select from '@material-ui/core/Select'

import { RouteOption } from '../types/app'

interface IProps {
	title: string
	onMenuClick: (e: any) => void
	routeOptions?: RouteOption[]
}

/**
 * TopNav for the main app view. `props.children` Takes `<li>` elements only.
 * @TODO Make the viewSelet prop optional, and do conditional rendering of the Select
 */
export class TopNav extends React.Component<IProps> {
	handleRouteChange = () => {
		console.log('handleRouteChange()')
	}

	render() {
		return (
			<>
				<div className='top-nav'>
					<IconButton className='top-nav_menu' onClick={this.props.onMenuClick}><Icon>menu</Icon></IconButton>
					<h3 className='top-nav__title'>{this.props.title}</h3>
					<ul>
						{ this.props.routeOptions && 
							<FormControl variant='outlined'>
								<Select
									value={this.props.routeOptions[0].route}
									autoWidth={true}
									onChange={this.handleRouteChange}
									input={<OutlinedInput labelWidth={100}/>}
								>
									{this.props.routeOptions.map(option =>
										<MenuItem value={option.route}>{option.label}</MenuItem>
									)}
								</Select>
							</FormControl>
						}
						{this.props.children}
					</ul>
				</div>
			</>
		)
	}
}