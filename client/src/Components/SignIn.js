import React, { useState, useEffect } from 'react';
import { Link , useHistory, useLocation } from 'react-router-dom';
import { useAuth } from './use-auth';

function SignIn() {
    const [userEmail, setUserEmail] = useState('');
    const [password, setPassword] = useState('');
    let history = useHistory();
    let location = useLocation();
    let auth = useAuth();
    let { from } = location.state || { from: { pathname: '/' } };
    
    const handleCancel = () => {
        history.push('/');
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        auth.signin(userEmail, password, () => history.replace(from))
        .then(user => {
            if (user === null) {
                history.push('/Unauthorized')
            }
        })
        .catch(error => {
            console.log(error);
            history.push('/error');
        })
    }

    return (
        <div className="form--centered">
            <h2>Sign In</h2>
            <form onSubmit={handleSubmit}>
                <label>Email Address</label>
                <input onChange={(e) => setUserEmail(e.target.value)} id="emailAddress" name="emailAddress" type="email" value={userEmail}></input>
                <label>Password</label>
                <input onChange={(e) => setPassword(e.target.value)} id="password" name="password" type="password" value={password}></input>
                <button className="button" type="submit">Sign In</button><button type="button" className="button button-secondary" onClick={handleCancel}>Cancel</button>
            </form>
            <p>Don't have a user account? Click here to <Link to='/signup'>sign up!</Link></p>
        </div>
    )
}

export default SignIn;
