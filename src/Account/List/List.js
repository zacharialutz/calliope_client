import React from 'react';

import SavedStory from './SavedStory/SavedStory';

import './List.css';

function List () {
	const store = [
		{
			id: 1,
			title: 'Story Title 1',
			content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id cursus orci. Morbi viverra ipsum arcu, eu pellentesque ex fringilla sit amet. Ut commodo a lectus vitae hendrerit. Nullam ut placerat est. Donec congue ante eget pellentesque sagittis. Vestibulum vulputate nibh nec nulla tristique semper.',
			open: false
		},
		{
			id: 2,
			title: 'Story Title 2',
			content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id cursus orci. Morbi viverra ipsum arcu, eu pellentesque ex fringilla sit amet. Ut commodo a lectus vitae hendrerit. Nullam ut placerat est. Donec congue ante eget pellentesque sagittis. Vestibulum vulputate nibh nec nulla tristique semper.',
			open: false
		},
		{
			id: 3,
			title: 'Story Title 3',
			content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id cursus orci. Morbi viverra ipsum arcu, eu pellentesque ex fringilla sit amet. Ut commodo a lectus vitae hendrerit. Nullam ut placerat est. Donec congue ante eget pellentesque sagittis. Vestibulum vulputate nibh nec nulla tristique semper.',
			open: false
		}
	]

	let list = store.map(item => {
		return <SavedStory
				key={item.id}
				title={item.title}
				content={item.content}
				open={item.open}
			/>
	});

	return (
		<div className='list'>
			<h2>Your Stories</h2>
			{list}
		</div>
	)
}

export default List;