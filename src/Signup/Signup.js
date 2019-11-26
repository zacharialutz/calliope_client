import React from 'react';
import config from '../config';
import PropTypes from 'prop-types';

import ApiContext from '../ApiContext';
import { Link } from 'react-router-dom';

import './Signup.css';

export default class Signup extends React.Component {
	static propTypes = {
		history: PropTypes.shape({
		  push: PropTypes.func,
		}).isRequired,
	  }

	static contextType = ApiContext

	// Takes filters and number to gen
	// Returns list of generated stories
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

		console.log(newUser);
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
			.then(res => {
				this.context.onSignup(res);
				this.props.history.push('/account');
			})
			.catch(error => this.setState({ error }))
	}

	render() {
		return (
			<section>
				<h2>Sign Up</h2>
				<form className='signupForm' onSubmit={e => this.onClickSubmit(e)}>
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
}