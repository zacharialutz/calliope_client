import React from 'react';
import { Link } from 'react-router-dom';

import './Nav.css';

function Nav(props) {
	let accLink = '/account'; // will be '/login' once further along building login process
	let accLabel = 'Account'; // will be 'Log In' once further along building login process
	if (props.user) {
		accLink = '/account';
	}

	return (
		<nav>
			<Link to={'/'}>Home</Link>
			{' '}
			<Link to={'/generator'}>Generator</Link>
			{' '}
			<Link to={accLink}>{accLabel}</Link>
		</nav>
	)
}

export default Nav;