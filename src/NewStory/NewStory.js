import React from 'react';
import config from '../config';

import './NewStory.css';

function saveStory(content) {
	const newStory = {
		
	}
	fetch(config.API_ENDPOINT + `/stories`, {
		method: 'POST',
		headers: {
			'content-type': 'application/json',
			'Authorization': `Bearer ${config.API_KEY}`
		},
		body: JSON.stringify(newStory)
	})
}

export default function NewStory(props) {
	return (
		<div>
			<p>{props.content}</p>
			<button className='btnSave' onCLick={() => saveStory(props.content)}>Save Story</button>
			<p>- - - - -</p>
		</div>
	)
}