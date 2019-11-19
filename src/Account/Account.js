import React from 'react';
import { Route } from 'react-router-dom';

import List from '../List/List';

import './Account.css';

function Account() {

	return (
		<section>
			<Route
				exact path={'/account'}
				component={ List }
			/>
		</section>
	)
}

export default Account;