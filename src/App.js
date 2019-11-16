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
  constructor(props) {
    super(props);

    this.state = {
      token: null,
      userId: null,
    };
  }

  render() {
    const contextVal = {
      userId: this.state.userId,
      token: this.state.token,
      login: (userId, token) => {
        this.setState({ userId, token });
      },
      logout: () => {
        this.setState({ userId: null, token: null });
      },
    };

    return (
      <BrowserRouter>
        <AuthContext.Provider value={contextVal}>
          <div className="container-fluid">
            <div className="row">
              <div className="col-12 col-md-8 col-lg-4 mx-auto">
                <div className="card mt-3 mt-md-5">
                  <div className="card-body p-2">
                    <Navbar />
                  </div>
                </div>
                <div className="card mt-2">
                  <div className="card-body">
                    <Switch>
                      {contextVal.token &&
                        <React.Fragment>
                          <Redirect from="/" to="/task" exact />
                          <Route path="/task" component={TaskListPage} exact />
                          <Route path="/task/:id" component={TaskShowPage} />
                        </React.Fragment>
                      }
                      {!contextVal.token &&
                        <React.Fragment>
                          <Redirect from="/" to="/login" exact />
                          <Route path="/login" component={LoginPage} />
                          <Route path="/register" component={RegisterPage} />
                        </React.Fragment>
                      }
                    </Switch>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AuthContext.Provider>
      </BrowserRouter>
    );
  }
}

export default App;
