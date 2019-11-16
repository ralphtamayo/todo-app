import React from 'react';
import api from '../../services/web-api.service';

class RegisterPage extends React.Component {
  constructor(props) {
    super(props);

    this.email = React.createRef();
    this.password = React.createRef();

    this.state = {
      success: null,
      error: null,
    }
  }

  register = async e => {
    e.preventDefault();

    const email = this.email.value;
    const password = this.password.value;

    if (email.trim().length === 0 || password.trim().length === 0) {
      return;
    }

    const requestBody = `
      createUser(userInput: { email: "${email}", password: "${password}" }) {
        _id
        email
      }`;
    await api.mutation(requestBody, response => {
      if (response.data.errors != null) {
        this.setState({ error: response.data.errors[0].message });
      } else {
        this.setState({ success: 'User successfully created!' });
        this.email.value = '';
        this.password.value = '';
      }
    });
  };

  render() {
    return (
      <form onSubmit={this.register}>
        {this.state.success != null &&
          <div className="alert alert-success" role="alert">{ this.state.success }</div>
        }
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
            ref={el => this.email = el}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            placeholder="Password"
            ref={el => this.password = el}
          />
        </div>
        <button type="submit" className="btn btn-primary btn-block">Register</button>
      </form>
    );
  }
}

export default RegisterPage;
