import React from 'react';
import config from '../config';
import ApiContext from '../ApiContext';
import './Signup.css';

import { Link } from 'react-router-dom';

export default class Signup extends React.Component {
	state = {
		error: null
	}

	static contextType = ApiContext;

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

		fetch(config.API_ENDPOINT + `/users`,
			{
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
			<div>
				<h2>Sign Up</h2>
				<section>
					<form className='signupForm bordered' onSubmit={e => this.onClickSubmit(e)}>
						<div className='formRow'>
							<label htmlFor='username'>username:</label>
							<input
								type='text'
								id='username'
								minLength='2'
								maxLength='16'
								required
								autoFocus
							/>
						</div>
						<div className='formRow'>
							<label htmlFor='email'>email:</label>
							<input
								type='email'
								id='email'
							/>
						</div>
						<div className='formRow'>
							<label htmlFor='password'>password:</label>
							<input
								type='password'
								id='password'
								minLength='6'
								maxLength='20'
								required
							/>
						</div>
						<div className='formRow'>
							<label htmlFor='retypePassword'>retype password:</label>
							<input
								type='password'
								id='retypePassword'
								minLength='6'
								maxLength='20'
								required
							/>
						</div>
						<input
							type='submit'
							className='btn'
							value='Submit'
						/>
					</form>
					{this.state.error &&
						<div className='errorMsg'>
							<h4>{this.state.error.message}</h4>
						</div>}
					<p>Already have an account? <Link to={'/login'}>Log in</Link></p>
				</section>
			</div>
		)
	}
}