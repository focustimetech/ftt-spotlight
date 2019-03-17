import * as React from 'react'

import axios from 'axios'

import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'

// import { Link } from 'react-router-dom'


export class Sidebar extends React.Component {
	componentDidMount() {
		axios.defaults.headers.post['Content-Type'] ='application/json';
		axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
		axios.get('http://localhost:8000/api/staff')
			.then(res => {
				const data = res.data
				console.log(data)
			})
	}

	render() {
		return (
			<>
				<div className='sidebar'>
					<nav className='sidebar__nav'>
						<IconButton><Icon>alarm</Icon></IconButton>
					</nav>
					<div className='sidebar__menu'>
						<div className='menu_header'><h4>Spotlight</h4></div>
						<ul className='menu_list'>
							<li className='menu_list__item'>My Classroom</li>
							<li className='menu_list__item'>Staff</li>
							<li className='menu_list__item'>Students</li>
							<li className='menu_list__item'>Cohort</li>
							<li className='menu_list__item'>Class Schedule</li>
							<li className='menu_list__item'>Appointments</li>
							<li className='menu_list__item'>Events</li>
							<li className='menu_list__item'>Reporting</li>
							<li className='menu_list__item'>Settings</li>
						</ul>
					</div>
				</div>
			</>
		)
	}
}