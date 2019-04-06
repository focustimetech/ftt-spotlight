import * as React from 'react'

import { Avatar } from '@material-ui/core'

import { NameWidget } from './NameWidget'
import { TopNav } from '../TopNav'


export class Student extends React.Component {
	render () {
		return (
			<div className='profile'>
				<TopNav>
					<li className='profile_title'>
						<Avatar className='profile_avatar'>CU</Avatar>
						<NameWidget value='Curtis Upshall' />
					</li>
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