import React from 'react';
import ApiContext from '../ApiContext'

import { Link } from 'react-router-dom';

import './Footer.css';

export default class Footer extends React.Component {
	static contextType = ApiContext

	render() {
		return (
			<footer>
				Copyright &copy; 2019 Zacharia Lutz<br />
				<Link to={'/about'} onClick={this.context.scrollTop()} >About this Application</Link><br />
				All Rights Reserved
		</footer>
		)
	}
}