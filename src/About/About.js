import React from 'react';
import './About.css';

export default function About() {
	return (
		<>
			<h2>About</h2>
			<section className='aboutApp'>
				<p>This storytelling app is named after Calliope, the Greek muse of writing and eloquence.
				It was initially created in 2019 by Zacharia Lutz for the Thinkful Engineering Immersion program.
				It uses a database of thousands of nouns, verbs, and adjectives to create intruiging and hilarious short stories
				which can be enjoyed as they are, or expanded upon for whatever purpose you desire!</p>
				<br />
				<p>Calliope is built from the following languages and libraries:</p>
				<p>HTML, CSS, JavaScript, React, Node.js, Express, PostgreSQL</p>
			</section>
			<address>
				<p>Contact me at <a href='mailto:zacharia.lutz@gmail.com'>zacharia.lutz@gmail.com</a></p>
			</address>
		</>
	);
}