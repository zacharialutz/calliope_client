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
				<p>This application generates short stories which can be used as a prompt or framework for you to expand on your own. Go to the Generator page to begin creating paragraph-length stories, randomly generated from a database of thousands of words. You can also create an account for saving and editing your favorites!</p>
			</section>

			<section className='callToAction'>
				<h2><Link to={'/generator'}>Generate Stories -></Link></h2>
			</section>

			<Signup />
		</div>
	);
}

export default LandingPage;
