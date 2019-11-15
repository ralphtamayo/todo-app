import axios from 'axios';

const apiUrl = 'http://localhost:4200/';

const api = {
	query: (query, callback = null) => {
		let requestBody = { query: `query { ${ query } }` };

		return api.request(requestBody, callback);
	},

	mutation: (query, callback = null) => {
		let requestBody = { query: `mutation { ${ query } }` };

		return api.request(requestBody, callback);
	},

	request: (body, callback = null) => {
		return axios.post(
			apiUrl,
			body,
			{ headers: {
				'Content-Type': 'application/json',
				// Authorization: 'Bearer ' + context.token
			}}
		).then(callback);
	}
}

export default api;
