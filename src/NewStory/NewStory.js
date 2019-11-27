import React from 'react';
import config from '../config';
import ApiContext from '../ApiContext'

import './NewStory.css';

export default class NewStory extends React.Component {
	static defaultProps = {
		content: '',
	}
	static contextType = ApiContext

	state = {
		error: null
	}

	// Saves story to server and callsback to have button disabled
	saveStory(content) {
		const newStory = {
			content,
			author: this.context.userId
		}
		fetch(config.API_ENDPOINT + `/stories`, {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
				'Authorization': `Bearer ${config.API_KEY}`
			},
			body: JSON.stringify(newStory)
		})
			.then(res => {
				if (!res.ok) {
					throw new Error(res.status)
				}
				return res.json()
			})
			.then(() => this.context.updateSaved(this.props.id))
			.catch(error => this.setState({ error }))
	}

	render() {
		const saved = (this.context.savedStories.includes(this.props.id));

		return (
			<div>
				<p>{this.props.content}</p>
				{this.context.username &&
					<>
						{!saved && <button className='btnSave' onClick={() => this.saveStory(this.props.content)}>Save Story</button>}
						{saved && <p>Saved!</p>}
					</>
				}
				<p>- - - - -</p>
			</div>
		)
	}
}