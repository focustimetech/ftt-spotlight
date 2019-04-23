import * as React from 'react'
import axios from 'axios'

import { Redirect, RouteComponentProps } from 'react-router-dom'

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

interface IProps extends RouteComponentProps {
	onSignIn: (callback?: () => void) => void
}

interface IState {
	user: string
	password: string
	redirectToReferrer: boolean
}

export class Login extends React.Component<IProps, IState> {
	state: IState = {
		user: '',
		password: '',
		redirectToReferrer: false
	}

	backgroundImage: string

	login = (credentials: LoginCredentials) => {
		this.props.onSignIn(() => {
			this.setState({
				redirectToReferrer: true
			})
		})
		return
		console.log('Logging in...')
		// axios.defaults.headers.post['Content-Type'] ='application/json';
		// axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
	
		axios.post('http://localhost:8000/api/login', {
			username: credentials.username,
			password: credentials.password
		})
			.then(res => {
				console.log(res)
			})
	
	}

	handleChange = (event: any) => {
		event.preventDefault()
		this.setState({ [event.target.name]: event.target.value } as IState)
	}
	
	handleLogin = () => {
		this.login({
		'username': this.state.user,
		'password': this.state.password
		})
	}

	componentDidMount() {
		this.backgroundImage = selectBackground()
	}

	render() {
		const { from } = this.props.location.state || { from: { pathname: '/' } }
	
		if (this.state.redirectToReferrer) {
			console.log(this.props.location)
			console.log('login redirecting to: ', from)
			return <Redirect to={from} />
		}
		return (
			<div className='login-wrap'>
				<div className='login'>
					<div className='login__about' style={{backgroundImage: this.backgroundImage}} >
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
			</div>
		)
	}
}