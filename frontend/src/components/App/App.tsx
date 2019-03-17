import '../../assets/styles/main.scss'

import * as React from 'react'
import { BrowserRouter } from 'react-router-dom'

import { Content } from '../Content'
import { Sidebar } from '../Sidebar/Sidebar'
import { TopNav } from '../TopNav'

interface IState {
	menuOpen: boolean
}

interface IProps {
	compiler: string
	framework: string
}

export default class App extends React.Component<IProps, IState> {
	toggleMenu = (e: any): void => {
		this.setState({ menuOpen: this.state.menuOpen === false })
		console.log('Menu is', this.state.menuOpen ? 'open' : 'not open')
	}

	componentDidMount() {
		this.state = {
			menuOpen: true
		}
	}

	render() {
		return ( 
			<>
				<div className='site-wrap'>
					<Sidebar />
					<Content>
						<TopNav title='Dashboard' onMenuClick={this.toggleMenu} />
					</Content>
				</div>
			</>
		)
	}
}