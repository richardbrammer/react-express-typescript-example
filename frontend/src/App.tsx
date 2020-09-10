import React, { useEffect, useState } from 'react';
import { Link, Route, BrowserRouter, Switch } from 'react-router-dom';

import { Account, Login, Register } from './users';
import { User } from './users/interfaces/user.interface';
import './App.css';

export interface State {
  currentUser: null | User;
}

function App() {

  const [state, setState] = useState<State>({ currentUser: null });

  /** get the actual user */
  useEffect(() => {
    fetch('http://localhost:3000/api/v1/users/current').then((response: Response) => {
      console.log(response);
      // setState({ currentUser: response.body });
    }).catch(() => {
      setState({ currentUser: null });
    });
  }, []);

  return (
    <BrowserRouter>
    <div className="container">
      <ul>
        { state.currentUser
          ? <li><Link to="/">Account</Link></li>
          : <div>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </div>
        }
        
      </ul>

      <hr />

      <Switch>
        <Route exact path="/">
          <Account user={state.currentUser} />
        </Route>
        <Route path="/login">
          <Login/>
        </Route>
        <Route path="/register">
          <Register />
        </Route>
      </Switch>
    </div>
  </BrowserRouter>
  );
}

export default App;
