import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import './App.css';
import LoginPage from './pages/auth/login.page';
import RegisterPage from './pages/auth/register.page';
import Navbar from './components/navbar.component';
import AuthContext from './context/auth.context';
import TaskListPage from './pages/task/list.page';
import TaskShowPage from './pages/task/show.page';

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
					{/* <h1>React works!</h1>
					<Navbar /> */}
					<div className="container-fluid">
						<div className="row">
							<div className="col-12 col-md-8 col-lg-4 mx-auto">
								<div className="card mt-3 mt-md-5">
									<div className="card-body">
										<Switch>
											<Redirect from="/" to="/task" exact />
											<Route path="/task/:id" component={ TaskShowPage } />
											<Route path="/task" component={ TaskListPage } />
											<Route path="/login" component={ LoginPage } />
											<Route path="/register" component={ RegisterPage } />
										</Switch>
									</div>
								</div>
							</div>
						</div>
					</div>
				</AuthContext.Provider>
			</BrowserRouter>
		);
	};
}

export default App;
