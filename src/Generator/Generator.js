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
		const { modern, historic, scifi, fantasy, num } = this.context

		this.setState({ loading: true });
		fetch(config.API_ENDPOINT + `/generator?num=${num}&modern=${modern}&historic=${historic}&scifi=${scifi}&fantasy=${fantasy}`, {
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
		const { modern, historic, scifi, fantasy, num, stories } = this.context

		return (
			<div>
				<header>
					<h2>Generate Stories</h2>
				</header>
				<section>
					<p>Use the checkboxes to toggle the inclusion of thematic words</p>
					<form className='generatorForm' onSubmit={e => this.onClickSubmit(e)}>
						<label htmlFor='modern'>modern:</label>
						<input type='checkbox' name='modern' id='modern' checked={modern} onChange={e => this.context.handleChangeModern(e)} />
						<label htmlFor='historic'>historic:</label>
						<input type='checkbox' name='historic' id='historic' checked={historic} onChange={e => this.context.handleChangeHistoric(e)} /><br />
						<label htmlFor='sci-fi'>sci-fi:</label>
						<input type='checkbox' name='scifi' id='scifi' checked={scifi} onChange={e => this.context.handleChangeScifi(e)} />
						<label htmlFor='fantasy'>fantasy:</label>
						<input type='checkbox' name='fantasy' id='fantasy' checked={fantasy} onChange={e => this.context.handleChangeFantasy(e)} /><br />
						<label htmlFor='numGen'>number of stories:</label>
						<input type='number' name='numGen' id='numGen' value={num} min='1' max='10' onChange={e => this.context.handleChangeNum(e)} /><br />
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