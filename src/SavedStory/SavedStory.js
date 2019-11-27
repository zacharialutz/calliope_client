import React from 'react';
import config from '../config'
import ApiContext from '../ApiContext'

import './SavedStory.css'

class SavedStory extends React.Component {
	static contextType = ApiContext;

	state = {
		open: false,
		error: null
	}

	// Toggles expanded view of saved story
	toggleOpen() {
		const toggle = !this.state.open;
		this.setState({
			open: toggle
		});
	}

	// Calls API to delete story then calls App to update state
	onDelete(id) {
		fetch(config.API_ENDPOINT + `/stories/${id}`, {
			method: 'DELETE',
			headers: {
				'content-type': 'application/json',
				'Authorization': `Bearer ${config.API_KEY}`
			}
		})
			.then(res => {
				if (!res.ok) {
					throw new Error(res.status)
				}
			})
			.then(() => {
				console.log('deleted!!!');
				this.context.handleDelete(id);
			})
			.catch(error => this.setState({ error }))
	}

	render() {
		return (
			<div>
				<h3 onClick={() => this.toggleOpen()}>{this.props.title}</h3>
				{this.state.open && <div>
					<p>{this.props.content}</p>
					<button disabled>Edit Title</button><button onClick={() => this.onDelete(this.props.id)}>Delete Story</button>
				</div>}
			</div>

		)
	}
}

export default SavedStory;