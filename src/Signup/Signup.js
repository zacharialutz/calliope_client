import React from 'react';
import config from '../config';

import { Link } from 'react-router-dom';

import './Signup.css';

// Takes filters and number to gen
// Returns list of generated stories
function onClickSubmit(e) {
	e.preventDefault();
	const newUser = [
		document.getElementById('username').value,
		document.getElementById('email').value,
		document.getElementById('password').value,
	];

	if(newUser[2] !== document.getElementById('retypePassword').value) {
		alert('Re-typed password must match');
		document.getElementById('password').focus();
		return;
	}

	fetch(config.API_ENDPOINT + `/users?username=${newUser[0]}&email=${newUser[1]}&password=${newUser[2]}`, {
		method: 'POST',
		headers: {
			'content-type': 'application/json',
			'Authorization': `Bearer ${config.API_KEY}`
		}
	})
		.then(res => {
			if (!res.ok) {
				throw new Error(res.status)
			}
			return res.json()
		})
		.then(res => {
			this.context.onSubmit(res);
		})
		.catch(error => this.setState({ error }))
}

function Signup() {
	return (
		<section>
			<h2>Sign Up</h2>
			<form className='signupForm' onSubmit={e => onClickSubmit(e)}>
				<label>username:</label>
				<input type='text' id='username' /><br />
				<label>email:</label>
				<input type='email' id='email' /><br />
				<label>password:</label>
				<input type='password' id='password' /><br />
				<label>retype password:</label>
				<input type='password' id='retypePassword' /><br />
				<input type='submit' value='Submit' />
			</form>
			<p>Already have an account? <Link to={'/login'}>Log in</Link></p>
		</section>
	)
}

export default Signup;