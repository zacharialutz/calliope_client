import React from 'react';

import './NewStory.css';

function NewStory() {
	return (
		<>
			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id cursus orci. Morbi viverra ipsum arcu, eu pellentesque ex fringilla sit amet. Ut commodo a lectus vitae hendrerit. Nullam ut placerat est. Donec congue ante eget pellentesque sagittis. Vestibulum vulputate nibh nec nulla tristique semper.</p>
				<label htmlFor='saveTitle'>Title:</label>
				<input type='text' id='saveTitle' placeholder='New Story' />
				<button>Save</button>
		</>
	)
}

export default NewStory;