import * as React from 'react'

import axios from 'axios'

import IconButton from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'

export class Sidebar extends React.Component {
	componentDidMount() {
		axios.defaults.headers.post['Content-Type'] ='application/json';
		axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
		axios.get('http://localhost:8000/api/staff')
			.then(res => {
				const data = res.data
				console.log(data)
			})
		console.log('axios did a thing2...')
	}

	render() {
		console.log('sidebar rendered')
		return (
			<>{/*
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
			*/}
			</>
		)
	}
}