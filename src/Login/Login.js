import React from 'react';
import config from '../config';
import ApiContext from '../ApiContext';
import './Login.css';

import { Link } from 'react-router-dom';

export default class Login extends React.Component {
	state = {
		error: null
	}

	static contextType = ApiContext;

	// Validates form and sends req to update user
	onClickSubmit(e) {
		e.preventDefault();
		const username = document.getElementById('username').value;
		const password = document.getElementById('password').value;

		fetch(config.API_ENDPOINT + `/users/login?username=${username}&password=${password}`, {
			method: 'GET',
			headers: {
				'content-type': 'application/json',
				'Authorization': `Bearer ${config.API_KEY}`
			},
		})
			.then(res => {
				if (!res.ok) {
					throw new Error(res.status)
				}
				return res.json()
			})
			.then(res => this.context.onLogin(res))
			.catch(error => this.setState({ error }))
	}

	render() {
		return (
			<div>
				<h2>Login</h2>
				<section>
					<form className='loginForm bordered' onSubmit={e => this.onClickSubmit(e)} >
						<div className='formRow'>
							<label htmlFor='username'>username:</label>
							<input type='text' name='username' id='username' required autoFocus />
						</div>
						<div className='formRow'>
							<label htmlFor='password'>password:</label>
							<input type='password' name='password' id='password' required />
						</div>
						<input type='submit' className='btn' value='Log In' />
					</form>
					{this.state.error &&
						<div className='errorMsg'>
							<h4>{this.state.error.message}</h4>
						</div>}
					<p>Don't have an account? <Link to={'/signup'}>Sign up</Link></p>
				</section>
			</div>
		)
	}
}