import * as React from 'react'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

interface User {
	user: string
	accountType: string
}

type LoginStep = 'user' | 'password' | 'reset'

interface IState {
	step: LoginStep
	user: string
	password: string
}

export class Login extends React.Component<{}, IState> {
	state = {
		step: 'user' as LoginStep,
		user: '',
		password: ''
	}

	handleChange = (event: any) => {
		event.preventDefault()
		this.setState({ [event.target.name]: event.target.value } as IState)
	}
	
	handleContinue = () => {
		console.log('handleContinue()')
		this.setState({ step: 'password' })
	}

	handleLogin = () => {
		console.log('handleLogin()')
		this.setState({ step: 'user' })
	}

	cancelUser = () => {
		console.log('cancelUser()')
		this.setState({ step: 'user' })
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
						<a href='https://focustime.ca' className='subtitle_link'>Start using powerful tools that let your self directed study blocks succeed.</a>
						<form className='login_form'>
							<h2>Sign in</h2>
							{this.state.step === 'user' && 
								<>
									<TextField
										name='user'
										label='Email or Student Number'
										value={this.state.user}
										onChange={this.handleChange}
										margin='normal'
										variant='filled'
										autoFocus={true}
										fullWidth={true}
									/>
									<div className='button_container'>
										<Button onClick={() => this.handleContinue()} color='primary' variant='contained'>Continue</Button>
									</div>
								</>}
							{this.state.step === 'password' &&
								<>
									<TextField
										name='password'
										label='Password'
										value={this.state.password}
										onChange={this.handleChange}
										margin='normal'
										variant='filled'
										autoFocus={true}
										fullWidth={true}
									/>
									<div className='button_container'>
										<Button onClick={() => this.cancelUser()} variant='text'>Cancel</Button>
										<Button onClick={() => this.handleLogin()} color='primary' variant='contained'>Sign In</Button>
									</div>
								</>
							}
						</form>
						<ul className='links_list'>
							<a href='https://focustime.ca'><li>Help</li></a>
							<a href='https://focustime.ca'><li>Legal</li></a>
						</ul>
					</div>
				</div>
			</div>
		)
	}
}