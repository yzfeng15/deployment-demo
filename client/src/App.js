import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import Profile from './components/UserPage';
import Logout from './components/Logout';
import './App.css';
import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import httpClient from './auth.helper';

function App() {
  const [user, setUser] = useState(httpClient.getCurrentUser());
  const [page, setPage] = useState('home');

  const logout = () => {
    httpClient.logOut();
    setUser(null);
  };

  return (
    <Router>
      <div className="outer">
        <Navbar activeUser={user} activePage={page} changePage={setPage} />
        <div className="body-bg">
          <Switch>
            <Route exact path="/">
              <HomePage changePage={setPage} />
            </Route>
            <Route path="/login">
              <LoginForm changePage={setPage} onSuccess={setUser} />
            </Route>
            <Route path="/register">
              <RegistrationForm changePage={setPage} />
            </Route>
            <Route path="/logout">
              <Logout onMount={logout} />
            </Route>
            <Route
              path="/user"
              render={() => {
                return user ? (
                  <Profile currentUser={user} changePage={setPage} />
                ) : (
                  <Redirect to="/login" />
                );
              }}
            />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
