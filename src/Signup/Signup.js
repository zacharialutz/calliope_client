import React from 'react';
import { Link } from 'react-router-dom';

import './Signup.css';

function Signup() {
	return (
		<section>
			<h2>Sign Up</h2>
			<form>
				<label>username:</label>
				<input type='text' /><br />
				<label>email:</label>
				<input type='email' /><br />
				<label>password:</label>
				<input type='password' /><br />
				<label>retype password:</label>
				<input type='password' /><br />
				<input type='submit' value='Submit (disabled)' disabled />
            </form>
            <p>Already have an account? <Link to={'/login'}>Log in</Link></p>
        </section>
	)
}

export default Signup;