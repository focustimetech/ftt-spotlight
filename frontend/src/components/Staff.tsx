import * as React from 'react'

import { EnhancedTable } from './Table/EnhancedTable'
import { TopNav } from './TopNav'

export class Staff extends React.Component {
	componentDidMount() {
		document.title = 'Dashboard - Spotlight'
	}

	render() {
		return (
			<>
				<TopNav>
					<ul><h3>Staff</h3></ul>
				</TopNav>
				<p>Welcome to the staff page!</p>
				<EnhancedTable />
			</>
		)
	}
}