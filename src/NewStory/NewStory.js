import React from 'react';
import config from '../config';
import ApiContext from '../ApiContext'

import './NewStory.css';

export default class NewStory extends React.Component {
	static defaultProps = {
		content: ''
	}
	static contextType = ApiContext

	state = {
		saved: false,
		error: null
	}

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
			.then(() => this.setState({ saved: true }))
			.catch(error => this.setState({ error }))
	}

	render() {
		return (
			<div>
				<p>{this.props.content}</p>
				{this.context.username &&
					<>
						{!this.state.saved && <button className='btnSave' onClick={() => this.saveStory(this.props.content)}>Save Story</button>}
						{this.state.saved && <p>Saved!</p>}
					</>
				}
				<p>- - - - -</p>
			</div>
		)
	}
}