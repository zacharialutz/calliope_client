import React from 'react';

import NewStory from './NewStory/NewStory';

import './Generator.css';

function Generator() {
	return (
		<div>
			<section>
				<h2>Generate Stories</h2>
				<p>Use the checkboxes to toggle the inclusion of thematic words</p>
				<form className='generatorForm'>
					<label htmlFor='modern'>modern:</label>
					<input type='checkbox' name='modern' id='modern' defaultChecked />
					<label htmlFor='historic'>historic:</label>
					<input type='checkbox' name='historic' id='historic' defaultChecked /><br />
					<label htmlFor='sci-fi'>sci-fi:</label>
					<input type='checkbox' name='sci-fi' id='sci-fi' defaultChecked />
					<label htmlFor='fantasy'>fantasy:</label>
					<input type='checkbox' name='fantasy' id='fantasy' defaultChecked /><br />
					<label htmlFor='numGen'>number of stories:</label>
					<input type='number' name='numGen' id='numGen' defaultValue='3' /><br />
					<input type='submit' value='Generate' />
				</form>
			</section>

			<section className='resultList'>
				<NewStory />
			</section>
		</div>
	)
}

export default Generator;