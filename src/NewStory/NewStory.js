import React from 'react';

import './NewStory.css';

function NewStory(props) {
	return (
		<>
			<p>{props.content}</p>
			{/* <label htmlFor='saveTitle'>Title:</label>
			<input type='text' id='saveTitle' placeholder='New Story' />
			<button disabled>Save</button> */}
			<p>- - - - -</p>
		</>
	)
}

export default NewStory;