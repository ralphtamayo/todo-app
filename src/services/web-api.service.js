import axios from 'axios';

const apiUrl = 'http://localhost:4200/';

const api = {
	query: (query, callback = null) => {
		let requestBody = { query: `query { ${ query } }` };

		return axios.post(
			apiUrl,
			requestBody,
			{ headers: {
				'Content-Type': 'application/json'
			}}
		).then(callback);
	},

	mutation: (query, callback) => {

	}
}

export default api;
