import React from 'react';
import { Link } from 'react-router-dom';

function RegistrationSuccessful() {
    return (
        <div>
            <h1>Registration successful.</h1>
            <p> Your registration has been successful. <Link to="/login">Log in</Link> to start using our app.</p>
        </div>
    );
}

export default RegistrationSuccessful;