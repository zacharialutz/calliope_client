import React from 'react';
import config from '../config';

import ApiContext from '../ApiContext';
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading';

import './Generator.css';

export default class Generator extends React.Component {
	static defaultProps = {
		stories: []
	}
	static contextType = ApiContext

	state = {
		loading: false
	}

	// Takes filters and number to gen
	// Returns list of generated stories
	onClickSubmit(e) {
		e.preventDefault();
		const filter = [
			document.getElementById('modern').checked,
			document.getElementById('historic').checked,
			document.getElementById('scifi').checked,
			document.getElementById('fantasy').checked
		];
		const num = document.getElementById('numGen').value;

		this.setState({ loading: true });
		fetch(config.API_ENDPOINT + `/generator?num=${num}&modern=${filter[0]}&historic=${filter[1]}&scifi=${filter[2]}&fantasy=${filter[3]}`, {
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
				this.context.onSubmit(res);
				this.setState({ loading: false });
			})
			.catch(error => this.setState({ error }))
	}

	render() {
		const stories = this.context.stories

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
						<input type='checkbox' name='sci-fi' id='scifi' defaultChecked />
						<label htmlFor='fantasy'>fantasy:</label>
						<input type='checkbox' name='fantasy' id='fantasy' defaultChecked /><br />
						<label htmlFor='numGen'>number of stories:</label>
						<input type='number' name='numGen' id='numGen' defaultValue='3' min='1' max='10' /><br />
						<input type='submit' value='Generate' />
					</form>
				</section>

				<section className='resultList'>
					{this.state.loading && <Loading />}
					{!this.state.loading && stories}
					{!this.context.username && <p>Want to save stories for later? <Link to={'/signup'}>Sign up</Link></p>}
				</section>
			</div>
		)
	}
}