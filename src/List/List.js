import React from 'react';
import config from '../config'
import ApiContext from '../ApiContext'

import { Link } from 'react-router-dom';
import SavedStory from '../SavedStory/SavedStory';

import './List.css';

export default class List extends React.Component {
	static contextType = ApiContext

	// Loads list of saved stories
	loadStories() {
		fetch(config.API_ENDPOINT + `/stories/list/${this.context.userId}`, {
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
			.then(list => {
				list.sort(function(a,b) {return a.id - b.id});
				this.context.updateList(list)
			})
			.catch(error => this.setState({ error }))
	}
	
	componentDidMount() {
		this.loadStories()
	}

	// Log Out button
	onLogout() {
		this.context.onLogin({ username: null });
	}

	render() {
		const list = this.context.list;

		return (
			<div className='list'>
				<h2>Your Stories</h2>
				<Link to={'/'} onClick={() => this.onLogout()}>Log Out</Link>
				<ul className='storyList'>
					{list.map(item =>
						<SavedStory
							key={item.id}
							reload={this.loadStories}
							{...item}
						/>
					)}
				</ul>
			</div>
		)
	}
}
