import * as React from 'react'

import axios from 'axios'
import * as classNames from 'classnames'

import Drawer from '@material-ui/core/Drawer'
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import { Link } from 'react-router-dom'

import { MenuItem } from './MenuItem'

/**
 * @TODO Need to handle the case where the screen is very narrow,
 * in which a modal nav manu should be used.
 */
export class Sidebar extends React.Component {

	componentDidMount() {
		/*
		axios.defaults.headers.post['Content-Type'] ='application/json';
		axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
		axios.get('http://localhost:8000/api/staff')
			.then(res => {
				const data = res.data
				console.log(data)
			})
		*/
	}

	render() {
		return (
			<>
				<Drawer open={false}>
					<div className='sidebar_modal'>
						<h4>Search</h4>
					</div>
				</Drawer>
				<div className='sidebar'>
					<nav className='sidebar__nav'>
						<div className='nav_top'>
							<Tooltip title='Spotlight' placement='right'><Link to='/'><IconButton className='nav_button'><Icon>home</Icon></IconButton></Link></Tooltip>
							<Tooltip title='Search' placement='right'><IconButton className='nav_button'><Icon>search</Icon></IconButton></Tooltip>
							<Tooltip title='Starred' placement='right'><IconButton className='nav_button'><Icon>star</Icon></IconButton></Tooltip>
							<Tooltip title='Check-in' placement='right'><IconButton className='nav_button'><Icon>how_to_reg</Icon></IconButton></Tooltip>
						</div>
						<div className='nav_bottom'>
							<Tooltip title='Notification' placement='right'><IconButton className='nav_button'><Icon>notifications</Icon></IconButton></Tooltip>
							<Tooltip title='Help' placement='right'><IconButton className='nav_button'><Icon>help</Icon></IconButton></Tooltip>
							<Tooltip title='Account' placement='right'><IconButton className='nav_button'><Icon>perm_identity</Icon></IconButton></Tooltip>
						</div>
					</nav>
					<div className='sidebar__menu'>
						<div className='menu_header'>
							<div className='menu_header__logo'></div>
							<h4>Oak Bay High</h4>
						</div>
						<ul className='menu_list'>
							<MenuItem to='/staff' icon='supervisor_account' label='Staff' />
							<MenuItem to='/students' icon='face' label='Students' />
							<MenuItem to='/appointments' icon='access_time' label='Appointments' />
							<MenuItem to='/cohort' icon='group' label='Cohort' />
							<MenuItem to='/class-schedule' icon='date_range' label='Class Schedule' />
							<MenuItem to='/event' icon='event' label='Events' />
							<MenuItem to='/reporting' icon='assignment' label='Reporting' />
							<MenuItem to='/settings' icon='settings' label='Settings' />
							<MenuItem to='/parents' icon='contact_mail' label='Parents' />
						</ul>
					</div>
				</div>
			</>
		)
	}
}