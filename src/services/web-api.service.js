import axios from 'axios';

const apiUrl = 'http://localhost:4200/';

const api = {
  query: (query, callback = null, auth = null) => {
    const requestBody = { query: `query { ${query} }` };

    return api.request(requestBody, callback);
  },

  mutation: (query, callback = null, auth = null) => {
    const requestBody = { query: `mutation { ${query} }` };

    return api.request(requestBody, callback, auth);
  },

  request: (body, callback = null, auth = null) => {
    let headers = {
      'Content-Type': 'application/json',
    }

    if (auth != null) {
      headers.Authorization = 'Bearer ' + auth.token;
    }

    return axios.post(apiUrl, body, { headers: headers }).then(callback);
  }
};

export default api;
