import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import './App.css';
import LoginPage from './pages/login.page';
import Navbar from './components/navbar.component';
import RegisterPage from './pages/register.page';
import AuthContext from './context/auth.context';

class App extends React.Component {
	state = {
		token: null,
		userId: null,
	}

	render() {
		let contextVal = {
			userId: this.state.userId,
			token: this.state.token,
			login: (userId, token, tokenExpiration) => {
				this.setState({ userId: userId, token: token });
			},
			logout: () => {
				this.setState({ userId: null, token: null });
			}
		}

		return (
			<BrowserRouter>
				<AuthContext.Provider value={ contextVal }>
					<h1>React works!</h1>
					<Navbar />

					<Switch>
						<Redirect from="/" to="/login" exact />
						<Route path="/login" component={ LoginPage } />
						<Route path="/register" component={ RegisterPage } />
					</Switch>
				</AuthContext.Provider>
			</BrowserRouter>
		);
	};
}

// function App() {
// }

export default App;
