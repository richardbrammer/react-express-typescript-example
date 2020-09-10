import React, { FormEvent, ChangeEvent } from 'react';
import { useState } from 'react';
import { UserLogin } from './interfaces/user-login.interface';
import { Link, Router, useHistory } from 'react-router-dom';

export interface State {
    form: UserLogin,
    submitResult: string | null;
}

function Login() {

    const emptyForm: UserLogin = { email: '', password: ''};
    const history = useHistory();
    const initalState = { submitResult: null, form: emptyForm };
    const [state, setState] = useState<State>(initalState);

    const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, form: { ...state.form, email: event.target.value }});
    }

    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, form: { ...state.form, password: event.target.value }});
    }


    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        fetch('http://localhost:3000/api/v1/users/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(state.form),
        }).then((response) => {
            if (response.status !== 200) {
                setState({...state, submitResult: response.statusText });
            } else {
                history.push('/');
            }
        });

    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input onChange={handleEmailChange} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input onChange={handlePasswordChange} name="password" type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            { state.submitResult &&
                <div className="alert alert-warning mt-3" role="alert">Email unknown or password incorrect. Please try again or <Link to="/register">create an account</Link>.</div>
            }
            <p className="mt-3">If you don't have an account, <Link to="/register">register here</Link>.</p>
        </div>
    );
}


export default Login;