import * as React from 'react'
import axios from 'axios'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

interface User {
	user: string
	accountType: string
}

interface LoginCredentials {
	username: string
	password: string
}

interface IState {
	user: string
	password: string
}

const login = (credentials: LoginCredentials) => {
	console.log('Logging in...')
	axios.defaults.headers.post['Content-Type'] ='application/json';
	axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';


	axios.get('http://localhost:8000/api/staff')
		.then(res => {
			const data = res.data
			console.log(data)
		})

	axios.post('http://localhost:8000/api/login', {
		username: credentials.username,
		password: credentials.password
	})
		.then(res => {
			console.log(res)
		})

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
		user: '',
		password: ''
	}

	handleChange = (event: any) => {
		event.preventDefault()
		this.setState({ [event.target.name]: event.target.value } as IState)
	}
	
	handleLogin = () => {
		login({
			'username': this.state.user,
			'password': this.state.password
		})
	}

	render() {
		return (
			<div className='login'>
				<div className='login__about' /*style={{backgroundImage: selectBackground()}}*/ >
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