import '../../assets/styles/main.scss'

import * as React from 'react'
import axios from 'axios'
import { Sidebar } from '../Sidebar/Sidebar'

interface IProps {
	compiler: string
	framework: string
}

export default class App extends React.Component<IProps> {
	render() {
		return ( 
			<>
				<div>
					<Sidebar />
				</div>
			</>
		)
	}
}