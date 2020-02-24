import React from 'react';
import { Route } from 'react-router-dom';
import ApiContext from '../ApiContext'
import './Account.css';

import List from '../List/List';

export default class Account extends React.Component {
	static defaultProps = {
		list: []
	}
	static contextType = ApiContext;

	componentDidMount() {
		if (!this.context.username && this.props.history) this.props.history.push('/');
	}

	render() {
		return (
			<>
				<h2>Your Stories</h2>
				<section>
					{this.context.username && <Route
						exact path={'/account'}
						component={List}
					/>}
				</section>
			</>
		)
	}

}