import React, { useState, FormEvent, ChangeEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';

import { UserLogin } from './interfaces/user-login.interface';
import { User } from './interfaces/user.interface';
import { config } from '../config/config';

export interface State {
    form: UserLogin,
    submitError: string | null;
    submitSuccess: string | null;
}

function Login({ onLogin }: { onLogin: CallableFunction }) {

    const emptyForm: UserLogin = { email: '', password: ''};
    const history = useHistory();
    const initalState: State = { form: emptyForm, submitError: null, submitSuccess: null };
    const [state, setState] = useState<State>(initalState);

    const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, form: { ...state.form, email: event.target.value }});
    }

    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, form: { ...state.form, password: event.target.value }});
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        axios.post(config.apiUrl + '/users/login', state.form).then((response: AxiosResponse<User | null>) => {
            onLogin(response.data);
            history.push('/');
        }).catch(err => {
            setState({...state, submitError: err });
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
            { state.submitError &&
                <div className="alert alert-warning mt-3" role="alert">Email unknown or password incorrect. Please try again or <Link to="/register">create an account</Link>.</div>
            }
            <p className="mt-3">If you don't have an account, <Link to="/register">register here</Link>.</p>
        </div>
    );
}


export default Login;