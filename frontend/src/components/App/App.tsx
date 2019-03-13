import '../../assets/styles/main.scss'

import * as React from 'react'
import { Sidebar } from '../Sidebar/Sidebar'
import { Hello } from '../Hello'

interface IProps {
	compiler: string
	framework: string
}

export default class App extends React.Component<IProps> {
	render() {
		return <div>
			<Sidebar />
			<Hello {...this.props}/>
		</div>
		
	}
}