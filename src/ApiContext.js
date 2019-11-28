import React from 'react'

export default React.createContext({
	modern: true,
	historic: true,
	scifi: true,
	fantasy: true,
	num: 3,

	list: [],
	stories: [],
	savedStories: [],
	username: null,
	loading: false,
	error: null,

	onSubmit: () => { },
	onLogin: () => { },
	updateSaved: () => { },
	updateList: () => { },
	updateStory: () => { },
	handleDelete: () => { },

	handleChangeModern: () => { },
	handleChangeHistoric: () => { },
	handleChangeScifi: () => { },
	handleChangeFantasy: () => { },
	handleChangeNum: () => { }
})