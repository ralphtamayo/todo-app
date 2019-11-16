import React from 'react';
import AuthContext from '../../context/auth.context';
import api from '../../services/web-api.service';

class LoginPage extends React.Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);

    this.email = React.createRef();
    this.password = React.createRef();

    this.state = {
      error: null,
    }
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
    }).catch(err => {
      this.setState({ error: err.response.data.errors[0].message });
    });
  };

  render() {
    return (
      <form onSubmit={this.login}>
        {this.state.error != null &&
          <div className="alert alert-danger" role="alert">{ this.state.error }</div>
        }
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
        <button type="submit" className="btn btn-primary btn-block">Login</button>
      </form>
    );
  }
}

export default LoginPage;
