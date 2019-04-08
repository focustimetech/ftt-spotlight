import * as React from 'react'

import { TopNav } from './TopNav'

import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'

interface IProps {
	// onMenuClick: (e: any) => void
}

const handleChange = (e: any): void => {
	console.log(e.target.label)
}

export class Dashboard extends React.Component<IProps> {
	componentDidMount() {
		document.title = 'Dashboard - Spotlight'
		console.log('props', this.props)
	}

	render() {
		return (
			<>
				<TopNav><h3>Dashboard</h3></TopNav>
				<p>Welcome to my Dashboard!</p>
			</>
		)
	}
}