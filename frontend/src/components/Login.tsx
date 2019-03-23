import * as React from 'react'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

interface IState {
	user: string
	password: string
}

export class Login extends React.Component<{}, IState> {
	state = {
		user: '',
		password: ''
	}

/*
	handleChange = (field: 'user' | 'password', event: any) => {
		this.setState({
		})
	}
*/
	
	render() {
		return (
			<div className='login'>
				<div className='login__about'>
					<h1>Smart attendance for the internet age.</h1>
					<h4>Want to know how Spotlight can improve your school?</h4>
					<Button>Learn More</Button>
				</div>
				<div className='login__credentials'>
					<form className='login_form'>
						<TextField
							id="outlined-email"
							label="Email"
							value={this.state.user}
							onChange={() => {}}
							margin="normal"
							variant="outlined"
						/>
						<TextField
							id="outlined-pass"
							label="Password"
							value={this.state.password}
							onChange={() => {}}
							margin="normal"
							variant="outlined"
						/>
						<Button>Sign In</Button>
					</form>
				</div>
			</div>
		)
	}
}