import React from 'react';
import config from '../config'

import ApiContext from '../ApiContext'

import './Generator.css';

export default class Generator extends React.Component {
	static defaultProps = {
		stories: []
	}
	static contextType = ApiContext

	// Takes filters and number to gen
	// Returns list of generated stories
	onClickSubmit(e) {
		e.preventDefault();
		// const queries = [
		// 	document.getElementById('modern').value,
		// 	document.getElementById('historic').value,
		// 	document.getElementById('sci-fi').value,
		// 	document.getElementById('fantasy').value,
		// 	document.getElementById('numGen').value
		// ];
		const num = document.getElementById('numGen').value;

		fetch(config.API_ENDPOINT + `/generator?num=${num}`, {
			method: 'GET',
			headers: {
				'content-type': 'application/json',
				'Authorization': `Bearer ${config.API_KEY}`
			}
		})
			.then(res => {
				if (!res.ok) {
					throw new Error(res.status)
				}
				return res.json()
			})
			.then(res => {
				console.log(res);
				this.context.onSubmit(res);
			})
			.catch(error => this.setState({ error }))
	}

	render() {
		const { stories } = this.context

		return (
			<div>
				<section>
					<h2>Generate Stories</h2>
					<p>Use the checkboxes to toggle the inclusion of thematic words</p>
					<form className='generatorForm' onSubmit={e => this.onClickSubmit(e)}>
						<label htmlFor='modern'>modern:</label>
						<input type='checkbox' name='modern' id='modern' defaultChecked />
						<label htmlFor='historic'>historic:</label>
						<input type='checkbox' name='historic' id='historic' defaultChecked /><br />
						<label htmlFor='sci-fi'>sci-fi:</label>
						<input type='checkbox' name='sci-fi' id='sci-fi' defaultChecked />
						<label htmlFor='fantasy'>fantasy:</label>
						<input type='checkbox' name='fantasy' id='fantasy' defaultChecked /><br />
						<label htmlFor='numGen'>number of stories:</label>
						<input type='number' name='numGen' id='numGen' defaultValue='3' min='1' max='10' /><br />
						<input type='submit' value='Generate' />
					</form>
				</section>

				<section className='resultList'>
					{stories}
				</section>
			</div>
		)
	}
}