import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { User } from './interfaces/user.interface';
import { config } from '../config/config';

function Account(props: { user: User | null, onLogout: CallableFunction }) {

    return (
        <div>
            <h1>Account</h1>
            { props.user ? <CurrentUser user={props.user} onLogout={props.onLogout} /> : <NoUser /> }
        </div>
    );
}

function CurrentUser({ user, onLogout } : { user: User, onLogout: CallableFunction }) {

    const logoutHandler = () => {
        axios.post(config.apiUrl + '/users/logout').then(() => {
            onLogout();
        });
    }

    return (
        <div>
            <p>Welcome, {user.fullname}!</p>
            <button onClick={logoutHandler} className="btn btn-secondary">Log out</button>
        </div>
    );
}

function NoUser() {
    return(
        <div>
            <p>Our content is only available to registered users.</p>
            <p>Please <Link to="/login">Login</Link> or <Link to="/register">Register</Link>.</p>
        </div>
    );
}

export default Account;