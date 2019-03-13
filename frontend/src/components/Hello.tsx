import * as React from 'react'

export interface IProps {
	compiler: string
	framework: string
}

export class Hello extends React.Component<IProps> {
	render() {
		return <h1 className='hello'>Hello from {this.props.compiler} and {this.props.framework}!</h1>
	}
}