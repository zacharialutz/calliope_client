import React from 'react';
import { Route } from 'react-router-dom';

import ApiContext from '../ApiContext'
// import { Link } from 'react-router-dom';
import List from '../List/List';

import './Account.css';

export default class Account extends React.Component {
	static defaultProps = {
		list: []
	}
	static contextType = ApiContext;

	componentDidMount() {
		if (!this.context.username) this.props.history.push('/');
	}

	render() {
		return (
			<section>
				{this.context.username && <Route
					exact path={'/account'}
					component={List}
				/>}
			</section>
		)
	}

}