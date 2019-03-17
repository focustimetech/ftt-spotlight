import * as React from 'react'

export class Content extends React.Component {

	render() {
		return <div className='content' id='content'>{this.props.children}</div>
	}
}