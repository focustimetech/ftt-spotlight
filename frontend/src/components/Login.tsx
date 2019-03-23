import * as React from 'react'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

interface User {
	user: string
	accountType: string
}

interface IState {
	step: string
	user: string
	password: string
}

export class Login extends React.Component<{}, IState> {
	state = {
		step: 'user',
		user: '',
		password: ''
	}

	handleChange = (event: any) => {
		event.preventDefailt()
		this.setState({ [event.target.name]: event.target.value } as IState)
	}
	
	render() {
		return (
			<div className='login'>
				<div className='login__about'>
					<a href='https://focustime.ca' className='logo_container'>
						<h1>Spotlight</h1>
					</a>
				</div>
				<div className='login__credentials'>
					<div className='login_container'>
						<h2>Smart attendance for the internet age.</h2>
						<h4>Start using powerful tools that let your self directed study blocks succeed.</h4>
						<form className='login_form'>
							<TextField
								name='user'
								label='Email or Student Number'
								value={this.state.user}
								onChange={this.handleChange}
								margin='normal'
								variant='outlined'
							/>
							<Button color='primary' variant='contained'>Continue</Button>
						</form>
					</div>
				</div>
			</div>
		)
	}
}