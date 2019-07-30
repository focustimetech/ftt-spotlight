import * as React from 'react'

import { TopNav } from './TopNav'

interface IProps {}

export class Dashboard extends React.Component<IProps> {
	componentDidMount() {
		document.title = 'Dashboard - Spotlight'
	}

	render() {
		return (
			<div className='content' id='content'>
				<TopNav><h3>Dashboard</h3></TopNav>
				<p>Welcome to my Dashboard!</p>
			</div>
		)
	}
}