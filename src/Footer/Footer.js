import React from 'react';

import { Link } from 'react-router-dom';

import './Footer.css';

// Scrolls back to top of page after link is clicked
function scrollTop() {
	document.body.scrollTop = 0; // For Safari
	document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

export default function Footer() {
	return (
		<footer>
			Copyright &copy; 2019 Zacharia Lutz<br />
			<Link to={'/about'} onClick={scrollTop()} >About this Application</Link><br />
			All Rights Reserved
		</footer>
	)
}