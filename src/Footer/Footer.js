import React from 'react';
import { Link } from 'react-router-dom';

import './Footer.css';

function Footer() {
	return(
		<footer>
			Copyright &copy; 2019 Zacharia Lutz<br />
			<Link to={'/about'} >About this Application</Link><br />
			All Rights Reserved
		</footer>
	)
}

export default Footer;