import React from 'react'

export default React.createContext({
	filter: {
		modern: true,
		historic: true,
		scifi: true,
		fantasy: true
	},
	num: 3,
	list: [],
	stories: [],
	username: null,
	loading: false,
	error: null,
	onSubmit: () => {},
	onSignup: () => {}
})