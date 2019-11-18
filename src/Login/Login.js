import React from 'react';
import { Link } from 'react-router-dom';

import './Login.css';

function Login() {
	return (
		<div>
			<section>
			<h2>Login</h2>
			<form>
				<label htmlFor='username'>username:</label>
				<input type='text' name='username' id='username' /><br />
				<label htmlFor='password'>password:</label>
				<input type='password' name='password' id='password' /><br />
				<input type='submit' />
            </form>
            <p>Don't have an account? <Link to={'/signup'}>Sign up</Link></p>
        </section>
		</div>
	)
}

export default Login;