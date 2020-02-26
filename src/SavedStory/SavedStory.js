import React from 'react';
import config from '../config'
import ApiContext from '../ApiContext'
import './SavedStory.css'

export default class SavedStory extends React.Component {
	static contextType = ApiContext;

	_isMounted = false;

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
		this._isMounted = true;
		this.setState({
			id: this.props.id,
			title: this.props.title,
			content: this.props.content
		})
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	// Input control
	handleChangeTitle = e => {
		if (this._isMounted) {
			this.setState({ title: e.target.value })
		}
	};

	// Toggles expanded view of saved story
	toggleOpen() {
		if (this._isMounted) {
			if (!this.state.editing) {
				const toggle = !this.state.open;
				this.setState({
					open: toggle
				});
			}
		}
	}
	keyPress(e) {
		if (e.keyCode === 13 || 32) {
			this.toggleOpen();
		}
	}

	// Enables edit of story title
	async onEdit() {
		if (this._isMounted) {
			await this.setState({ editing: true });
			document.getElementById('titleEdit').focus();
		}
	}

	// Cancels out of title edit
	onCancel() {
		if (this._isMounted) {
			this.setState({ editing: false });
		}
	}

	// Updates story in database and callbacks to refresh state
	onSave(e) {
		e.preventDefault();

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
				if (this._isMounted) {
					this.setState({ editing: false })
				}
			})
			.catch(error => this.setState({ error }))
	}

	// Calls API to delete story then calls App to update state
	onDelete() {
		const id = this.props.id;
		fetch(config.API_ENDPOINT + `/stories/${id}`,
			{
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
			<form className='savedStory bordered' onSubmit={e => this.onSave(e)}>
				<h3 tabIndex='0' onKeyPress={e => this.keyPress(e)} onClick={() => this.toggleOpen()}>
					{!editing && this.state.title}
					{editing &&
						<input
							className='editTitle'
							id='titleEdit'
							type='text'
							value={this.state.title}
							onChange={e => this.handleChangeTitle(e)}
							required
						/>
					}
				</h3>
				{this.state.open &&
					<>
						<p className='storyText'>{this.state.content}</p>
						{!editing && <button className='btn' onClick={() => this.onEdit()}>Edit Title</button>}
						{editing &&
							<>
								<input
									type='submit'
									className='btn'
									value='Save'
								/>
								<button className='btn' onClick={() => this.onCancel()}>Cancel</button>
							</>
						}
						<button className='btn' onClick={() => this.onDelete()}>Delete Story</button>
					</>
				}
			</form>

		)
	}
}