import React from 'react';
import config from '../config'
import ApiContext from '../ApiContext'

import Loading from '../Loading/Loading';
import SavedStory from '../SavedStory/SavedStory';

import './List.css';

export default class List extends React.Component {
	static contextType = ApiContext

	state = {
		loading: false,
		error: null
	}

	// Loads list of saved stories
	componentDidMount() {
		this.context.updateList([]);

		this.setState({ loading: true });
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
				list.sort(function (a, b) { return a.id - b.id });
				this.context.updateList(list)
				this.setState({ loading: false });
			})
			.catch(error => this.setState({ error }))
	}

	render() {
		const list = this.context.list;

		return (
			<div className='list'>
				{this.state.loading && <Loading />}
				<ul className='storyList'>
					{list.map(item =>
						<li key={item.id}>
							<SavedStory {...item} />
						</li>
					)}
				</ul>
			</div>
		)
	}
}
