import React from 'react';
import config from '../config'
import ApiContext from '../ApiContext'

import './SavedStory.css'

export default class SavedStory extends React.Component {
	static contextType = ApiContext;

	state = {
		id: '',
		title: '',
		content: '',

		open: false,
		editing: false,
		error: null
	}

	// Loads state
	componentDidMount() {
		this.setState({
			id: this.props.id,
			title: this.props.title,
			content: this.props.content
		})
	}

	// Input control
	handleChangeTitle = e => {
		this.setState({ title: e.target.value })
	};
	handleChangeContent = e => {
		this.setState({ content: e.target.value })
	};

	// Toggles expanded view of saved story
	toggleOpen() {
		if (!this.state.editing) {
			const toggle = !this.state.open;
			this.setState({
				open: toggle
			});
		}
	}

	// Turns on and off the edit state
	onEdit(setting) {
		this.setState({ editing: setting });
	}

	// Updates story in database and callbacks to refresh state
	onSave() {
		const newStory = {
			title: this.state.title,
			content: this.state.content
		}

		fetch(config.API_ENDPOINT + `/stories/${this.state.id}`, {
			method: 'PATCH',
			headers: {
				'content-type': 'application/json',
				'authorization': `Bearer ${config.API_KEY}`
			},
			body: JSON.stringify(newStory)
		})
			.then(res => {
				if (!res.ok) {
					throw new Error(res.status)
				}
			})
			.then(() => {
				this.onEdit(false);
				this.props.reload();
			})
			.catch(error => this.setState({ error }))
	}

	// Calls API to delete story then calls App to update state
	onDelete() {
		const id = this.props.id;
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
				this.context.handleDelete(id);
			})
			.catch(error => this.setState({ error }))
	}

	render() {
		const editing = this.state.editing;

		return (
			<div>
				<h3 onClick={() => this.toggleOpen()}>
					{!editing && this.props.title}
					{editing && <input className='editTitle' type='text' value={this.state.title} onChange={e => this.handleChangeTitle(e)} required />}
				</h3>
				{this.state.open && <div>
					<p>{this.state.content}</p>
					{!editing && <button onClick={() => this.onEdit(true)}>Edit</button>}
					{editing &&
						<>
							<button onClick={() => this.onSave()}>Save</button>
							<button onClick={() => this.onEdit(false)}>Cancel</button>
						</>}
					<button onClick={() => this.onDelete()}>Delete Story</button>
				</div>}
			</div>

		)
	}
}