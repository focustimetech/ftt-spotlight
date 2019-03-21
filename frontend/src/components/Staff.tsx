import * as React from 'react'

export class Staff extends React.Component {
	componentDidMount() {
		document.title = 'Dashboard - Spotlight'
	}

	render() {
		return (
			<>
				<p>Welcome to the staff page!</p>
			</>
		)
	}
}