import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux'
import * as yup from 'yup';

import { axiosWithAuth, BASE_URL } from '../api-client/auth';
import { setError, signOut } from '../actions';
import { editUserSchema } from '../yup_schema';

import Container from './styled/Container';
import Section from './styled/Section';
import { YellowSpan } from './styled/Spans';
import TextInput from './styled/TextInput';
import Button from './styled/Button';
import Toast from './styled/Toast';

const EditUser = props => {
  const { toastError, currentUser, setError, signOut } = props;
  const history = useHistory();

  const initialValues = {
    password:"",
    email:"",
  }
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState(initialValues);
  const [disabled, setDisabled] = useState(true);

  const handleChange = e => {
    const {name, value} = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    })

    yup
      .reach(editUserSchema, name)
      .validate(value)
      .then(_ => {
        setFormErrors({
          ...formErrors,
          [name]:'',
        })
      })
      .catch(err => {
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0],
        })
        setDisabled(true);
      })
  }

  const handleSubmit = async e => {
    e.preventDefault();

    let valuesToSubmit;

    if ("email" in formValues && formValues.email) {
      if ("password" in formValues && formValues.password) valuesToSubmit = formValues;
      else valuesToSubmit = { email: formValues.email };
    } else if ("password" in formValues && formValues.password) valuesToSubmit = { password: formValues.password }

    editUserSchema
      .validate(formValues)
      .then(_ => {
        axiosWithAuth()
          .patch(BASE_URL + `/users/user/${currentUser.userid}`, valuesToSubmit)
          .then(async _ => {
            window.localStorage.removeItem("tuffet-token");
            window.localStorage.removeItem("userData");
            signOut();
            setError({message:"Changes made successfully!", variant:"success"})
            history.push("/login");
          })
          .catch(err => {
            console.log(err);
            setError({message:"Uh-oh! Something went wrong.", variant:"danger"});
          })
      })
      .catch(_ => setError({message:"Oops! Something went wrong.", variant:"danger"}));
  }

  useEffect(() => {
    editUserSchema
      .validate(formValues)
      .then(isValid => setDisabled(!isValid))
      .catch(err => err);
  })
  
  return (
    <div>
      <Container>
        <Section>
          <h2><YellowSpan>Change password</YellowSpan></h2>
          <form style={{display:"flex", flexFlow:"column", alignItems:"center", justifyContent:"space-evenly"}}>
            <TextInput
              label="Email"
              name="email"
              // placeholder="email"
              type="text"
              value={formValues.email}
              error={formErrors.email}
              onChange={handleChange}
            />
            <TextInput
              label="Password"
              name="password"
              // placeholder="password"
              type="password"
              value={formValues.password}
              error={formErrors.password}
              onChange={handleChange}
            />
            <Button
              variant={disabled ? 'disabled' : ''}
              disabled={disabled}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </form>
        </Section>
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
    currentUser: state.currentUser,
  }
}

export default connect(mapStateToProps, { setError, signOut })(EditUser)
