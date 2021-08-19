import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import * as yup from 'yup';

import { login, axiosWithAuth } from '../api-client/auth';
import { getCurrentUser, setError, setMessages } from '../actions';
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
  const { toastError, uri, getCurrentUser, setError, setMessages } = props;

  const handleSubmit = async e => {
    e.preventDefault();
    let loggedIn = false;
    let userData;

    await loginSchema
      .validate(formValues)
      .then(async _ => {
        setLoading(true);
        userData = await login(formValues);
        if (userData.status) {
          if (userData.status === 401 || userData.status === 400) {
            setError({message:"Username and password not found.", variant:"danger"});
          }
          else setError({message:"Something went wrong!", variant:"danger"});
        }
        getCurrentUser(userData);

        if (userData.role === "ADMIN") {
          let messages;
          await axiosWithAuth()
            .get('/messages/messages')
            .then(res => messages = res.data)
            .catch(err => console.log(err));
          
          setMessages(messages);
        }

        loggedIn = userData && userData.username;
        setLoading(false);
      })
      .catch(err => console.log(err));
    
    if (loggedIn) {
      if (userData.role === "ADMIN") history.push("/dashboard");
      else history.push(uri);
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
        variant={toastError.variant}
        onClick={() => setError(false)}
      >
        {toastError.message}
      </Toast>}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    toastError: state.toastError,
  }
}

export default connect(mapStateToProps, { getCurrentUser, setError, setMessages })(Login)
