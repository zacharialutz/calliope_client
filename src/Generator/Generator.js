import React from 'react';
import config from '../config';

import NewStory from '../NewStory/NewStory';

import './Generator.css';

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

		fetch(config.API_ENDPOINT + `/generator`, {
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
				const newList = res.map(item => <NewStory content={item} />)
				this.setState({
					list: newList
				})
			})
			.catch(error => this.setState({ error }))
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