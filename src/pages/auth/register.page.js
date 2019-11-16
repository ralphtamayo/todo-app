import React from 'react';
import api from '../../services/web-api.service';

class RegisterPage extends React.Component {
  constructor(props) {
    super(props);

    this.email = React.createRef();
    this.password = React.createRef();
  }

  register = async e => {
    e.preventDefault();

    const email = this.email.current.value;
    const password = this.password.current.value;

    if (email.trim().length === 0 || password.trim().length === 0) {
      return;
    }

    const requestBody = `
      createUser(userInput: { email: "${email}", password: "${password}" }) {
        _id
        email
      }`;
    await api.mutation(requestBody);
  };

  render() {
    return (
      <form onSubmit={this.register}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            placeholder="Email"
            ref={this.email}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            placeholder="Password"
            ref={this.password}
          />
        </div>
        <button type="submit" className="btn btn-primary btn-block">Register</button>
      </form>
    );
  }
}

export default RegisterPage;
