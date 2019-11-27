import React from 'react';
import config from '../config';

import ApiContext from '../ApiContext';
import { Link } from 'react-router-dom';

import './Signup.css';

export default class Signup extends React.Component {
	state = {
		error: null
	}

	static contextType = ApiContext;

	componentDidMount() {
		document.getElementById('username').focus();
	}

	// Validates form and sends req to create user
	onClickSubmit(e) {
		e.preventDefault();
		const newUser = {
			username: document.getElementById('username').value,
			email: document.getElementById('email').value,
			password: document.getElementById('password').value,
		};
		if (newUser.password !== document.getElementById('retypePassword').value) {
			alert('Re-typed password must match');
			document.getElementById('password').focus();
			return;
		}

		fetch(config.API_ENDPOINT + `/users`, {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
				'Authorization': `Bearer ${config.API_KEY}`
			},
			body: JSON.stringify(newUser)
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
			<section>
				<h2>Sign Up</h2>
				<form className='signupForm' onSubmit={e => this.onClickSubmit(e)}>
					<label>username:</label>
					<input type='text' id='username' required /><br />
					<label>email:</label>
					<input type='email' id='email' required /><br />
					<label>password:</label>
					<input type='password' id='password' required /><br />
					<label>retype password:</label>
					<input type='password' id='retypePassword' required /><br />
					<input type='submit' value='Submit' />
				</form>
				{this.state.error &&
					<div className='errorMsg'>
						<h4>{this.state.error.message}</h4>
					</div>}
				<p>Already have an account? <Link to={'/login'}>Log in</Link></p>
			</section>
		)
	}
}