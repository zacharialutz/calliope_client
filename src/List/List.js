import React from 'react';
import config from '../config';

import SavedStory from '../SavedStory/SavedStory';

import './List.css';

const stories = [];

class List extends React.Component {
	state = {
		stories,
		error: null
	}

	setStories = stories => {
		this.setState({
			stories,
			error: null
		})
	}

	componentDidMount() {
		fetch(config.API_ENDPOINT + `/stories`, {
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
		  .then(this.setStories)
		  .catch(error => this.setState({ error }))
	  }
	
	render() {
		const stories = this.state.stories;
		return (
			<div className='list'>
				<h2>Your Stories</h2>
				<ul className='storyList'>
					{stories.map(item =>
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

export default List;