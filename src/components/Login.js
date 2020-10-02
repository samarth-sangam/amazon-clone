import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './Login.scss';
import { auth } from 'firebaseConfig';
const Login = () => {
    const history = useHistory();
    const [ email, setEmail ] = useState( '' );
    const [ password, setPassword ] = useState( '' );

    const signIn = ( event ) => {
        event.preventDefault();
        // Firebase auth
        auth.signInWithEmailAndPassword( email, password )
            .then( auth => {
                console.log( auth );
                if ( auth ) {
                    history.push( '/' );
                }
            } )
            .catch( error => alert( error.message ) );
    };

    const register = ( event ) => {
        event.preventDefault();
        // Firebase register
        auth.createUserWithEmailAndPassword( email, password )
            .then( auth => {
                // it successfully created user with password
                console.log( auth );
                if ( auth ) {
                    history.push( '/' );
                }
            } )
            .catch( error => alert( error.message ) );
    };

    return (
        <div className='login'>
            <Link to='/'>
                <img
                    className='login__logo' src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Amazon.com-Logo.svg/200px-Amazon.com-Logo.svg.png' alt='' />
            </Link>

            <div className='login__container'>
                <h1>Sign-in</h1>
                <form>
                    <h5>E-mail</h5>
                    <input type='text' value={ email } onChange={ e => setEmail( e.target.value ) } />

                    <h5>Password</h5>
                    <input type='password' value={ password } onChange={ e => setPassword( e.target.value ) } />

                    <button type='submit' onClick={ signIn } className='login__signInButton'>Sign In</button>
                </form>
                <p>
                    By Signing-in you agree to Amazon Clone's Conditions of Use & Sale. Please see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.
                </p>

                <button onClick={ register } className='login__registerButton'>Create your Amazon Account</button>
            </div>
        </div>
    );
};

export default Login;
