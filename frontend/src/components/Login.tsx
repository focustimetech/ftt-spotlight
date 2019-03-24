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

const selectBackground = () => {
	const imageList: string[] = [
		'ali-yahya-782497-unsplash.jpg',
		'brooke-cagle-609873-unsplash.jpg',
		'helloquence-61189-unsplash.jpg',
		'john-schnobrich-520023-unsplash.jpg',
		'mimi-thian-737597-unsplash.jpg',
		'mimi-thian-737711-unsplash.jpg',
		'priscilla-du-preez-293218-unsplash.jpg'
	]
	const arrayIndex: number = Math.floor(Math.random() * imageList.length)
	return `url('src/assets/images/splash/${imageList[arrayIndex]}')`
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
	
	handleLogin = () => {
		console.log('handleLogin()')
		this.setState({ step: 'user' })
	}

	render() {
		return (
			<div className='login'>
				<div className='login__about' style={{backgroundImage: selectBackground()}}>
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
							<TextField
								name='user'
								type='text'
								label='Email or Student Number'
								value={this.state.user}
								onChange={this.handleChange}
								margin='normal'
								variant='filled'
								autoFocus={true}
								fullWidth={true}
							/>
							<TextField
								name='password'
								type='password'
								label='Password'
								value={this.state.password}
								onChange={this.handleChange}
								margin='normal'
								variant='filled'
								autoFocus={true}
								fullWidth={true}
							/>
							<div className='button_container'>
								<Button onClick={() => this.handleLogin()} color='primary' variant='contained'>Sign In</Button>
							</div>
						</form>
						<ul className='links_list'>
							<a href='https://focustime.ca'><li>Help</li></a>
						</ul>
					</div>
				</div>
			</div>
		)
	}
}