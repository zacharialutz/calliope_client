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
		title: 'New Story',
		saved: false,
		error: null
	}

	// Check if already saved
	componentDidMount() {
		this.setState({ saved: this.context.savedStories.includes(this.props.id) })
	}

	// Input control
	handleChangeTitle = e => {
		this.setState({ title: e.target.value })
	};

	// Saves story to server and callsback to have button disabled
	onSave(e) {
		e.preventDefault();

		const newStory = {
			title: this.state.title,
			content: this.props.content,
			author: this.context.userId
		}

		fetch(config.API_ENDPOINT + `/stories`,
			{
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
			.then(() => {
				this.setState({ saved: true });
				this.context.updateSaved(this.props.id);
			})
			.catch(error => this.setState({ error }))
	}

	render() {
		// const saved = (this.context.savedStories.includes(this.props.id));
		const saved = this.state.saved;

		return (
			<form className='newStory' onSubmit={e => this.onSave(e)}>
				<p className='storyText'>{this.props.content}</p>
				{this.context.username &&
					<>
						{!saved && <>
							<label htmlFor='saveTitle'>Title:</label>
							<input
								type='text'
								id='saveTitle'
								placeholder='New Story'
								onChange={e => this.handleChangeTitle(e)}
							/>
							<input type='submit' value='Save Story' />
						</>}
						{saved && <p>Saved!</p>}
					</>
				}
				<p>- - - - -</p>
			</form>
		)
	}
}