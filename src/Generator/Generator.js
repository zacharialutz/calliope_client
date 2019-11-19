import React from 'react';
import uuid from 'uuid';

import NewStory from '../NewStory/NewStory';

import './Generator.css';

// Gives a 1 in (num) chance to return true
// function rollDice(num) {
// 	if (Math.floor((Math.random() * num)) === 0) return true;
// 	else return false;
// }

class Generator extends React.Component {
	state = {
		list: []
	}

	// Takes filters and number to gen
	// TODO: Calls server to give params and recieve stories
	// Returns list of generated stories
	handleSubmit(e) {
		e.preventDefault();
		// const queries = [
		// 	document.getElementById('modern').value,
		// 	document.getElementById('historic').value,
		// 	document.getElementById('sci-fi').value,
		// 	document.getElementById('fantasy').value,
		// 	document.getElementById('numGen').value
		// ];
		const num = document.getElementById('numGen').value;

		const bank = [
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
			'Donec id cursus orci.',
			'Morbi viverra ipsum arcu, eu pellentesque ex fringilla sit amet.',
			'Ut commodo a lectus vitae hendrerit.',
			'Nullam ut placerat est.',
			'Donec congue ante eget pellentesque sagittis.',
			'Vestibulum vulputate nibh nec nulla tristique semper.'
		];
		let result = [];
		for (let i = 0; i < num; i++) {
			const story = bank[Math.floor( Math.random() * bank.length )];
			result.push(<NewStory
					key={uuid()}
					content={story}
				/>);
		};
		this.setState({
			list: result
		})
	}

	render() {
		return (
			<div>
				<section>
					<h2>Generate Stories</h2>
					<p>Use the checkboxes to toggle the inclusion of thematic words</p>
					<form className='generatorForm' onSubmit={e => this.handleSubmit(e)}>
						<label htmlFor='modern'>modern:</label>
						<input type='checkbox' name='modern' id='modern' defaultChecked />
						<label htmlFor='historic'>historic:</label>
						<input type='checkbox' name='historic' id='historic' defaultChecked /><br />
						<label htmlFor='sci-fi'>sci-fi:</label>
						<input type='checkbox' name='sci-fi' id='sci-fi' defaultChecked />
						<label htmlFor='fantasy'>fantasy:</label>
						<input type='checkbox' name='fantasy' id='fantasy' defaultChecked /><br />
						<label htmlFor='numGen'>number of stories:</label>
						<input type='number' name='numGen' id='numGen' defaultValue='3' /><br />
						<input type='submit' value='Generate' />
					</form>
				</section>

				<section className='resultList'>
					{this.state.list}
				</section>
			</div>
		)
	}
}

export default Generator;