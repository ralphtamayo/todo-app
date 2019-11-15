import React from 'react';
import api from '../../services/web-api.service';

class RegisterPage extends React.Component {
	constructor(props) {
		super(props);

		this.email = React.createRef();
		this.password = React.createRef();
	}

	register = async (e) => {
		e.preventDefault();

		let email = this.email.current.value;
		let password = this.password.current.value;

		if (email.trim().length === 0 || password.trim().length === 0) {
			return;
		}

		let requestBody = `
			createUser(userInput: { email: "${ email }", password: "${ password }" }) {
				_id
				email
			}`
		;

		await api.mutation(requestBody);
	};

	render() {
		return (
			<form onSubmit={ this.register }>
				<h1>Register</h1>
				<div>
					<label>Email</label>
					<input type="email" id="email" placeholder="email" ref={ this.email } />
				</div>
				<div>
					<label>Password</label>
					<input type="password" id="password" placeholder="password" ref={ this.password } />
				</div>
				<input type="submit"/>
			</form>
		);
	}
}

export default RegisterPage;
