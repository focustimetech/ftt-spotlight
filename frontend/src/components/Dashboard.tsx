import * as React from 'react'

import { TopNav } from './Topnav'

import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'

interface IProps {
	// onMenuClick: (e: any) => void
}

const handleChange = (e: any): void => {
	console.log(e.target.label)
}

export class Dashboard extends React.Component<IProps> {

	render() {
		return (
			<>
				<p>Welcome to my Dashboard!</p>
			</>
		)
	}
}