import React from 'react';

import ApiContext from '../ApiContext'
import SavedStory from '../SavedStory/SavedStory';

import './List.css';

export default class List extends React.Component {
	static defaultProps = {
		stories: []
	}
	static contextType = ApiContext

	render() {
		const { list } = this.context;

		return (
			<div className='list'>
				<h2>Your Stories</h2>
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
