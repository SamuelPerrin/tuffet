import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import * as yup from 'yup';

import { getCurrentUser } from '../actions';
import { BASE_URL, login } from '../api-client/auth';
import { registerSchema } from '../yup_schema';

import Container from './styled/Container';
import Section from './styled/Section';
import { YellowSpan } from './styled/Spans';
import TextInput from './styled/TextInput';
import Button from './styled/Button';
import Toast from './styled/Toast';

const Register = props => {
  const { getCurrentUser } = props;
  const [showToast, setShowToast] = useState(false);
  const history = useHistory();

  const initialValues = {
    username:"",
    password:"",
    email:"",
  }
  const [formValues, setFormValues] = useState(initialValues);
  const [errors, setErrors] = useState(initialValues);
  const [disabled, setDisabled] = useState(true);

  const handleSubmit = async e => {
    e.preventDefault();

    registerSchema
      .validate(formValues)
      .then(_ => {
        axios
          .post(BASE_URL + '/users/user/register', formValues)
          .then(async _ => {
            const userData = await login({username: formValues.username, password: formValues.password});
            await getCurrentUser(userData);
            history.push("/my-poems");
          })
          .catch(err => console.log(err));
          })
      .catch(err => console.log(err));
    
    setShowToast(true);
  }

  const handleChange = e => {
    const {name, value} = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    })

    yup
      .reach(registerSchema, name)
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
    registerSchema
      .validate(formValues)
      .then(isValid => setDisabled(!isValid))
      .catch(err => err);
  })

  return (
    <div>
      <Container>
        <Section>
          <h2><YellowSpan>Create a new account</YellowSpan></h2>
          <form onSubmit={handleSubmit}  style={{display:"flex", flexFlow:"column", alignItems:"center", justifyContent:"space-evenly"}}>
            <TextInput
              label="Username*"
              name="username"
              placeholder="username"
              type="text"
              value={formValues.username}
              error={errors.username}
              onChange={handleChange}
            />
              <TextInput
                label="Email"
                name="email"
                placeholder="email"
                type="text"
                value={formValues.email}
                error={errors.email}
                onChange={handleChange}
              />
              <TextInput
                label="Password*"
                name="password"
                placeholder="password"
                type="password"
                value={formValues.password}
                error={errors.password}
                onChange={handleChange}
              />
            <Button variant={disabled ? 'disabled' : ''} disabled={disabled}>Submit</Button>
          </form>
        </Section>
      </Container>
      {showToast &&
      <Toast
        variant='danger'
        onClick={() => setShowToast(false)}
      >
        Oops! That name is already taken.
      </Toast>}
    </div>
  )
}

const mapStateToProps = state => ({})

export default connect(mapStateToProps, {getCurrentUser})(Register)
