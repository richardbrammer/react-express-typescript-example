import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

import { config } from '../config/config';
import { UserRegister } from './interfaces/user-register.interface';

export interface validationResult {
    value: string;
    msg: string;
    param: string;
    location: string;
}

export interface State {
    form: UserRegister,
    submitError: { errors: validationResult[] } | null;
    submitSuccess: string | null;
    passwordsEqual: boolean;
}

function Register() {

    const emptyForm: UserRegister = {
        email: '',
        password: '',
        fullname: ''
    };
    const initialState: State = {
        form: emptyForm,
        submitError: null,
        submitSuccess: null,
        passwordsEqual: true
    };
    const [state, setState] = useState(initialState);
    const history = useHistory();

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        axios.post(config.apiUrl + '/users/register', state.form).then(() => {
            setState({ ...state, submitError: null, submitSuccess: 'Register successful.' });
            history.push('/registration-successful');
        }).catch((err) => {
            if (err.response.status === 400) {
                setState({...state, submitError: err.response.data });
                console.log(err.response.data);
            }
            if (err.response.status === 403) {
                setState({...state, submitError: { errors: [{
                    value: state.form.email,
                    msg: 'Email is already registered',
                    param: 'email',
                    location: 'body'
                }]}})
            }
        });
    }

    const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, form: { ...state.form, email: event.target.value }});
        console.log(state);
    }

    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, form: { ...state.form, password: event.target.value }});
        console.log(state);
    }

    const handlePassword2Change = (event: ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, passwordsEqual: (event.target.value === state.form.password) })
    }

    const handleFullnameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, form: { ...state.form, fullname: event.target.value }});
        console.log(state);
    }


    return (
    <div>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input onChange={handleEmailChange} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input onChange={handlePasswordChange} name="password" type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword2">Repeat Password</label>
                <input onChange={handlePassword2Change} name="password2" type="password" className="form-control" id="exampleInputPassword2" placeholder="Repeat the password" />
                { !state.passwordsEqual &&
                    <small id="emailHelp" className="form-text text-muted">Your passwords don't match.</small>
                }
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputFullname1">Full name</label>
                <input onChange={handleFullnameChange} name="fullname" type="text" className="form-control" id="exampleInputFullname1" placeholder="First name and last name" />
            </div>
            <button type="submit" disabled={!state.passwordsEqual} className="btn btn-primary">Submit</button>
        </form>
        { state.submitError &&
            Errors(state.submitError.errors)
        }
        <p className="mt-3">If you already have an account, <Link to="/login">log in here</Link>.</p>
    </div>
    )
}

function Errors(errors: validationResult[]) {
    return (
        <div className="alert alert-warning mt-3" role="alert">
            <p>The folowing errors occured:</p>
            <ul>            
            { 
                errors.map((err, i) => {
                    return (<li key={i}>{err.param}: {err.msg}</li>);
                })
            }
            </ul>
        </div>
    );
}

export default Register;