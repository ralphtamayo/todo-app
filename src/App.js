import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import './App.css';
import LoginPage from './pages/auth/login.page';
import RegisterPage from './pages/auth/register.page';
import Navbar from './components/navbar.component';
import AuthContext from './context/auth.context';
import TaskListPage from './pages/task/list.page';

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
						<Redirect from="/" to="/task" exact />
						<Route path="/task" component={ TaskListPage } />
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
