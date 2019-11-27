import React from 'react';
import config from '../config'

import ApiContext from '../ApiContext'
import { Link } from 'react-router-dom';
import SavedStory from '../SavedStory/SavedStory';

import './List.css';

export default class List extends React.Component {
	static contextType = ApiContext

	state = {
		list: []
	}

	// Loads list of saved stories
	componentDidMount() {
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
		  .then(list => this.setState({ list }))
		  .catch(error => this.setState({ error }))
	  }

	onLogout() {
		this.context.onLogin({ username: null });
	}

	render() {
		const list = this.state.list;

		return (
			<div className='list'>
				<h2>Your Stories</h2>
				<Link to={'/'} onClick={() => this.onLogout()}>Log Out</Link>
				<ul className='storyList'>
					{list.map(item =>
						<SavedStory
							key={item.id}
							{...item}
						/>
					)}
				</ul>
			</div>
		)
	}
}
