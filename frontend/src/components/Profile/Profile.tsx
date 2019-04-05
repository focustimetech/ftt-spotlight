import * as React from 'react'

import { Avatar } from '@material-ui/core'

import { TopNav } from '../TopNav'


export class Profile extends React.Component {
	render () {
		return (
			<div className='profile'>
				<TopNav>
					<div className='profile_title'>
						<Avatar>CU</Avatar>
						<h3>Curtis Upshall</h3>
					</div>
				</TopNav>
				<div className='profile__about'>
					<h5>About</h5>
					<ul>
						<li>Clusters: 5</li>
					</ul>
				</div>
			</div>
		)
	}
}