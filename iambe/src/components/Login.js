import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import * as yup from 'yup';

import { login } from '../api-client/auth';
import { getCurrentUser, setError } from '../actions';
import { loginSchema } from '../yup_schema/';

import Container from './styled/Container';
import Section from './styled/Section';
import { YellowSpan, BlueSpan } from './styled/Spans';
import TextInput from './styled/TextInput';
import Button from './styled/Button';
import Toast from './styled/Toast';
import Spinner from './styled/Spinner';

const initialValues = {
  username:"",
  password:""
};

const Login = props => {
  const [formValues, setFormValues] = useState(initialValues);
  const [errors, setErrors] = useState(initialValues);
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { toastError, uri, getCurrentUser, setError,  } = props;

  const handleSubmit = async e => {
    e.preventDefault();
    let loggedIn = false;

    await loginSchema
      .validate(formValues)
      .then(async _ => {
        setLoading(true);
        // const userData = await login(formValues);
        let userData = await login(formValues);
        if (userData.status) {
          if (userData.status === 401) setError("Username and password not found.");
          else setError("Something went wrong!");
        }

        getCurrentUser(userData);
        loggedIn = userData && userData.username;
        setLoading(false);
      })
      .catch(err => console.log(err));
    
    if (loggedIn) {
      history.push(uri);
    } else {
      setFormValues(initialValues);
    }
  }

  const handleChange = e => {
    const {name, value} = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    })

    yup
      .reach(loginSchema, name)
      .validate(value)
      .then(_ => {
        setErrors({
          ...errors,
          [name]: '',
        })
      })
      .catch(err => {
        setErrors({
          ...errors,
          [name]: err.errors[0],
        })
        setDisabled(true);
      })   
  }

  useEffect(() => {
    loginSchema
      .validate(formValues)
      .then(isValid => setDisabled(!isValid))
      .catch(err => err);
  })

  return (
    <div>
      <Container>
        {loading ? <Spinner /> : <Section>
          <h2><YellowSpan>Log in</YellowSpan></h2>
          <form onSubmit={handleSubmit} style={{display:"flex", flexFlow:"column", alignItems:"center", justifyContent:"space-evenly"}}>
            <TextInput 
              label="Username"
              name="username"
              type="text"
              value={formValues.username}
              error={errors.username}
              onChange={handleChange}
            />
            <TextInput 
              label="Password"
              name="password"
              type="password"
              value={formValues.password}
              error={errors.password}
              onChange={handleChange}
            />
            <Button variant={disabled ? 'disabled' : ''} disabled={disabled}>Login</Button>
          </form>
          <p>Don't have an account? <Link to='/register'><BlueSpan>Sign up!</BlueSpan></Link></p>
        </Section>}
      </Container>
      {toastError &&
      <Toast
        variant='danger'
        onClick={() => setError(false)}
      >
        {toastError}
      </Toast>}
      {/* {loading &&
        <Toast
          variant='success'
          onClick={() => setLoading(false)}
        >
          Loading might take a minute.
        </Toast>} */}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    toastError: state.toastError,
  }
}

export default connect(mapStateToProps, { getCurrentUser, setError })(Login)
