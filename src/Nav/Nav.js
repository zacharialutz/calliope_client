import React from 'react';

import ApiContext from '../ApiContext';
import { Link } from 'react-router-dom';

import './Nav.css';

export default class Nav extends React.Component {
	static defaultProps = {
		username: null
	}
	static contextType = ApiContext

	render() {
		let accLink = '/login';
		let accLabel = 'Log In';
		if (this.context.username) {
			accLink = '/account';
			accLabel = this.context.username;
		}

		return (
			<nav>
				<Link to={'/'}>Home</Link>
				{' - '}
				<Link to={'/generator'}>Generator</Link>
				{' - '}
				<Link to={accLink}>{accLabel}</Link>
			</nav>
		)
	};
}