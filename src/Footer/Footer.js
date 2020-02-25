import React from 'react';
import './Footer.css';

import { Link } from 'react-router-dom';

// Scrolls back to top of page after link is clicked
function scrollTop() {
	document.body.scrollTop = 0; // For Safari
	document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

export default function Footer() {
	return (
		<footer>
			<Link to={'/about'} onClick={scrollTop()}>About this Application</Link><br />
			Copyright &copy; 2020 Zacharia Lutz<br />
			All Rights Reserved
		</footer>
	)
}