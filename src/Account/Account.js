import React from 'react';
import { Route } from 'react-router-dom';

import ApiContext from '../ApiContext'
import { Link } from 'react-router-dom';
import List from '../List/List';

import './Account.css';

export default class Account extends React.Component {
	static defaultProps = {
		list: []
	}
	static contextType = ApiContext;

	render() {
		return (
			<section>
				<Route
					exact path={'/account'}
					component={List}
				/>
			</section>
		)
	}

}