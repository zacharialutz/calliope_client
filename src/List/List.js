import React from 'react';

import ApiContext from '../ApiContext'
import { Link } from 'react-router-dom';
import SavedStory from '../SavedStory/SavedStory';

import './List.css';

export default class List extends React.Component {
	static defaultProps = {
		list: []
	}
	static contextType = ApiContext

	onLogout() {
		const user = { username: null };
		this.context.onLogin(user);
	}

	render() {
		const { list } = this.context;

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
