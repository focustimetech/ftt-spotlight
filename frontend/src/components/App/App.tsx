import '../../assets/styles/main.scss'

import * as React from 'react'
import axios from 'axios'
import { Sidebar } from '../Sidebar/Sidebar'
import { Hello } from '../Hello'

interface IProps {
	compiler: string
	framework: string
}

export default class App extends React.Component<IProps> {
	componentDidMount() {
		axios.get('http://localhost:8000/api/staff')
			.then(res => {
				const data = res.data
				console.log(data)
			})
		console.log('axios did a thing...')
	}
	render() {
		return ( 
			<>
				<div>
					<Sidebar />
					<Hello {...this.props}/>
					<h1>Test</h1>
				</div>
			</>
		)
	}
}