import * as React from 'react'

import axios from 'axios'
import * as classNames from 'classnames'

import Drawer from '@material-ui/core/Drawer'
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import { Link } from 'react-router-dom'

import { MenuItem } from './MenuItem'

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
							<Link to='/'><IconButton className='nav_button'><Icon>home</Icon></IconButton></Link>
							<IconButton className='nav_button'><Icon>search</Icon></IconButton>
							<IconButton className='nav_button'><Icon>star</Icon></IconButton>
							<IconButton className='nav_button'><Icon>how_to_reg</Icon></IconButton>
						</div>
						<div className='nav_bottom'>
							<IconButton className='nav_button'><Icon>notifications</Icon></IconButton>
							<IconButton className='nav_button'><Icon>help</Icon></IconButton>
							<IconButton className='nav_button'><Icon>perm_identity</Icon></IconButton>
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