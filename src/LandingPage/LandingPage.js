import React from 'react';
import { Link } from 'react-router-dom';

import Signup from '../Signup/Signup.js';

import './LandingPage.css';

function LandingPage () {
	return (
		<div>
			<header className='hero' role="banner">
				<h1>Storytime Generator</h1>
			</header>

			<section className='instructions'>
				<h2>Landing page instructions</h2>
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id cursus orci. Morbi viverra ipsum arcu, eu pellentesque ex fringilla sit amet. Ut commodo a lectus vitae hendrerit. Nullam ut placerat est. Donec congue ante eget pellentesque sagittis. Vestibulum vulputate nibh nec nulla tristique semper.</p>
			</section>

			<section className='callToAction'>
				<h2><Link to={'/generator'}>Generate Stories -></Link></h2>
			</section>

			<Signup />
		</div>
	);
}

export default LandingPage;
