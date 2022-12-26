import React from 'react'
import { state, useState, useEffect } from 'react';
import Wrapper from '../assets/wrappers/RegisterPage';
import { Logo, FormRow, Alert } from '../components';
import { useAppContext } from '../context/appContext';
import { useNavigate } from 'react-router-dom'
const initialState = {
    username: '',
    email: '',
    password: '',
    isMember: ''
}

const Register = () => {
    const navigate = useNavigate()
    const [ value, setValue ] = useState( initialState );
    const { user, showAlert, isLoading, displayAlert, clearAlert, registerUser, loginUser, setupUser } = useAppContext();

    const toggleMember = () => {
        setValue( { ...value, isMember: !value.isMember } )
    }

    const onChange = ( e ) => {
        setValue( { ...value, [ e.target.name ]: e.target.value } )
    }

    const onSubmit = ( e ) => {
        e.preventDefault();
        const { username, email, password, isMember } = value
        if ( !email || !password || ( !isMember && !username ) ) {
            displayAlert();
            return;
        }
        console.log( 'Input values are - ', value );
        const currentUser = { username, email, password }
        if ( isMember ) {
            console.log( "Already a member, login." )
            setupUser( { currentUser, endPoint: '/login', alertText: 'Login Success, Redirecting..!' } )
        }
        else {
            console.log( " Not a member, register a new user." );
            setupUser( { currentUser, endPoint: '/register', alertText: 'Regiter Success, redirecting...!' } )
        }
    }
    useEffect( () => {
        if ( user ) {
            setTimeout( () => {
                navigate( '/' )
            }, 3000 );
        }
    }, [ user, navigate ] )
    return (
        <Wrapper className="full-page">
            <form className='form' onSubmit={ onSubmit }>
                <Logo />
                <h3> { value.isMember ? 'Login' : 'Register' }</h3>
                { showAlert && <Alert /> }
                {/* Name Input only in registrations */ }
                { !value.isMember && (
                    <FormRow type="text" name='username' value={ value.username } onChange={ onChange } />
                ) }

                {/* Email Input */ }
                <FormRow type="text" name='email' value={ value.email } onChange={ onChange } />

                {/* Password Input */ }
                <FormRow type="password" name='password' value={ value.password } onChange={ onChange } />

                <button type='submit' className='btn btn-block' onSubmit={ onSubmit } disabled={ isLoading }>Submit</button>
                <p>
                    { value.isMember ? 'Not a member?' : 'Already a member?' }
                    <button type='button' className='member-btn' onClick={ toggleMember }>
                        { value.isMember ? 'Register' : 'Login' }
                    </button>
                </p>
            </form>
        </Wrapper>
    )
}

export default Register
