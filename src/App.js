import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import './App.css';
import LoginPage from './pages/login.page';
import Navbar from './components/navbar.component';
import RegisterPage from './pages/register.page';

function App() {
	return (
		<BrowserRouter>
			<h1>React works!</h1>
			<Navbar />

			<Switch>
				<Redirect from="/" to="/login" exact />
				<Route path="/login" component={ LoginPage } />
				<Route path="/register" component={ RegisterPage } />
			</Switch>
		</BrowserRouter>
	);
}

export default App;
