import React from 'react';

import './SavedStory.css'

class SavedStory extends React.Component {
	state = {
		open: false
	}
	
	// toggles expanded view of saved story
	 toggleOpen() {
		const toggle = !this.state.open;
		this.setState({
			open: toggle
		});
	}

	render() {
		return (
			<div>
				<h3 onClick={() => this.toggleOpen()}>{this.props.title}</h3>
				{this.state.open && <div>
						<p>{this.props.content}</p>
						<button>Edit</button><button>Delete</button>
					</div>}
			</div>
			
		)
	}
}

export default SavedStory;