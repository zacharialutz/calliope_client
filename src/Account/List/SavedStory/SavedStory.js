import React from 'react';

import './SavedStory.css'

function SavedStory(props) {
	// let open = false;

	return (
		<div>
			<h3>{props.title}</h3>
			<p>{props.content}</p>
			<button>Edit</button><button>Delete</button>
		</div>
		
	)
}

export default SavedStory;