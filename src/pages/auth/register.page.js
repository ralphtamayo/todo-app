import React from 'react';

class RegisterPage extends React.Component {
	constructor(props) {
		super(props);

		this.email = React.createRef();
		this.password = React.createRef();
	}

	register = (e) => {
		e.preventDefault();

		let email = this.email.current.value;
		let password = this.password.current.value;

		if (email.trim().length === 0 || password.trim().length === 0) {
			return;
		}

		fetch('http://localhost:4200/', {
			method: 'POST',
			body: JSON.stringify({
				query: `
					mutation {
						createUser(userInput: { email: "${ email }", password: "${ password }" }) {
							_id
							email
						}
					}
				`
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(res => {
			if (res.status !== 200 && res.status !== 201) {
				throw new Error('Registration failed');
			}

			return res.json();
		}).then(user => {
			console.log(user);
		}).catch(err => {
			console.log(err);
		});
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
