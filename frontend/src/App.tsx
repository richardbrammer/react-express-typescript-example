import React, { useEffect, useState } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';

import { config } from './config/config';
import { Account, Login, Register } from './users';
import { User } from './users/interfaces/user.interface';
import './App.css';
import RegistrationSuccessful from './users/RegistrationSuccessul';

export interface State {
  currentUser: null | User;
}

function App() {

  const [state, setState] = useState<State>({ currentUser: null });

  const setUser = (user: User | null) => {
    setState({ currentUser: user });
  }

  /** get the actual user */
  useEffect(() => {
    axios(config.apiUrl + '/users/current').then((response: AxiosResponse<User | null>) => {
       setUser(response.data);
    }).catch(err => {
      setUser(null);
    });
  }, []);

  

  return (
    <BrowserRouter>
    <div className="container mt-5">
      <Switch>
        <Route exact path="/">
          <Account user={state.currentUser} />
        </Route>
        <Route path="/login">
          <Login onLogin={setUser}/>
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/registration-successful">
          <RegistrationSuccessful />
        </Route>
      </Switch>
    </div>
  </BrowserRouter>
  );
}

export default App;
