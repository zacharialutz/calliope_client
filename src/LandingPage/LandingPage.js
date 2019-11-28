import React from 'react';
import { Link } from 'react-router-dom';

import './LandingPage.css';

export default function LandingPage() {
	return (
		<div>
			<header className='hero' role="banner">
				<h1>Calliope</h1>
			</header>

			<section className='instructions'>
				<p>This app generates short stories which can be used as a prompt to expand on your own.<br />You can also create an account for saving your favorites!</p>
				<p>A demonstration account can be accessed with "demo" and "password".</p>
			</section>

			<section className='callToAction'>
				<p>Begin creating paragraph-length stories, randomly generated from a database of thousands of words.</p>
				<h2><Link to={'/generator'}>Generate Stories -></Link></h2>
			</section>
		</div>
	);
}
