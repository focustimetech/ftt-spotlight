import * as React from 'react'
import IconButton from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'

export class Sidebar extends React.Component {
	render() {
		return (
			<>
				<div className='sidebar'>
					<nav className='sidebar__nav'>
						<IconButton><Icon>alarm</Icon></IconButton>
					</nav>
					<ul className='sidebar__menu'>
						<li className='sidebar__menu__item --header'>Spotlight</li>
						<li className='sidebar__menu__item'>Attendance</li>
						<li className='sidebar__menu__item'>Reporting</li>
						<li className='sidebar__menu__item'>Staff</li>
						<li className='sidebar__menu__item'>Students</li>
					</ul>
				</div>

			</>
		)
	}
}