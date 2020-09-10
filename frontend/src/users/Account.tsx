import React from 'react';

import { User } from './interfaces/user.interface';
import { Link } from 'react-router-dom';

function Account(props: { user: User | null }) {

    return (
        <div>
            <h1>Account</h1>
            { props.user 
                ? <p>Welcome, {props.user.fullname}!</p>
                : <p>Please <Link to="/login">Login</Link> or <Link to="/register">Register</Link>.</p>
            }
        </div>
    );
}

export default Account;