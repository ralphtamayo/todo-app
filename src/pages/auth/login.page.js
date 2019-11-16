import React from 'react';
import AuthContext from '../../context/auth.context';
import api from '../../services/web-api.service';

class LoginPage extends React.Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);

    this.email = React.createRef();
    this.password = React.createRef();
  }

  login = async e => {
    e.preventDefault();

    const email = this.email.current.value;
    const password = this.password.current.value;

    if (email.trim().length === 0 || password.trim().length === 0) {
      return;
    }

    const requestBody = `
      login(email: "${email}", password: "${password}") {
        userId
        token
        tokenExpiration
      }`;
    await api.query(requestBody, response => {
      this.context.login(
        response.data.data.login.userId,
        response.data.data.login.token,
        response.data.data.login.tokenExpiration,
      );
    });
  };

  render() {
    return (
      <form onSubmit={this.login}>
        <h1>Login</h1>
        <div>
          <label>Email</label>
          <input type="email" id="email" placeholder="email" ref={this.email} />
        </div>
        <div>
          <label>Password</label>
          <input type="password" id="password" placeholder="password" ref={this.password} />
        </div>
        <input type="submit" />
      </form>
    );
  }
}

export default LoginPage;
