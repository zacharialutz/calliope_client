import React from 'react';

import ApiContext from '../ApiContext';
import { Link } from 'react-router-dom';

import './Nav.css';

export default class Nav extends React.Component {
	static defaultProps = {
		username: null
	}
	static contextType = ApiContext

	// Log Out button
	onLogout() {
		this.context.onLogin({ username: null });
		this.context.onSubmit([]);
	}

	render() {
		return (
			<nav>
				<Link to={'/'}>Generate</Link>
				{!this.context.username &&
					<>
						<Link to={'/signup'}>Sign Up</Link>
						<Link to={'/login'}>Log In</Link>
					</>
				}
				{this.context.username &&
					<>
						<Link to={'/account'}>{this.context.username}</Link>
						<Link to={'/'} onClick={() => this.onLogout()}>Log Out</Link>
					</>
				}
			</nav>
		)
	};
}