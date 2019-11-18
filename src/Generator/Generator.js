import React from 'react';

import './Generator.css';

function Generator() {
	return (
		<div>
			<section>
				<h2>Generate Stories</h2>
				<form className='generatorForm'>
					<label htmlFor='modern'>modern:</label>
					<input type='checkbox' name='filter' id='modern' defaultChecked />
					<label htmlFor='historic'>historic:</label>
					<input type='checkbox' name='filter' id='historic' defaultChecked /><br />
					<label htmlFor='sci-fi'>sci-fi:</label>
					<input type='checkbox' name='filter' id='sci-fi' defaultChecked />
					<label htmlFor='fantasy'>fantasy:</label>
					<input type='checkbox' name='filter' id='fantasy' defaultChecked /><br />
					<label htmlFor='numGen'>number of stories:</label>
					<input type='number' name='number to generate' id='numGen' /><br />
					<input type='submit' value='Generate' />
				</form>
			</section>

			<section className='resultList'>
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id cursus orci. Morbi viverra ipsum arcu, eu pellentesque ex fringilla sit amet. Ut commodo a lectus vitae hendrerit. Nullam ut placerat est. Donec congue ante eget pellentesque sagittis. Vestibulum vulputate nibh nec nulla tristique semper. Nullam elit ex, lobortis sit amet luctus non, malesuada sit amet leo.</p>
				<label htmlFor='saveTitle'>Title:</label>
				<input type='text' id='saveTitle' placeholder='New Story' />
				<button>Save</button>
			</section>
		</div>
	)
}

export default Generator;