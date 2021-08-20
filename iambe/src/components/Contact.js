import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as yup from 'yup';
import axios from 'axios';

import { BASE_URL } from '../api-client/auth';
import { setError } from '../actions';
import { contactSchema } from '../yup_schema';

import Container from './styled/Container';
import Section from './styled/Section';
import { YellowSpan } from './styled/Spans';
import TextInput from './styled/TextInput';
import TextArea from './styled/TextArea';
import Button from './styled/Button';
import Toast from './styled/Toast';

const Contact = props => {
  const { currentUser, toastError, setError } = props;

  const initialValues = {
    subject:"",
    body:"",
    email:"",
    user:currentUser,
  }

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState(initialValues);
  const [disabled, setDisabled] = useState(true);

  const handleChange = e => {
    const { name, value } = e.target;
    
    setFormValues({
      ...formValues,
      [name]: value,
    })

    yup
      .reach(contactSchema, name)
      .validate(value)
      .then(_ => {
        setFormErrors({
          ...formErrors,
          [name]:''
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    await contactSchema
      .validate(formValues)
      .then(async _ => {
        await axios
          .post(BASE_URL + '/messages/message', formValues)
          .then(res => {
            console.log(res);
            setError({message:"Your message has been submitted.",variant:"success"})
          })
          .catch(err => {
            console.log(err);
            setError({message:"Uh-oh! Something went wrong.",variant:"danger"})
          })
        
          setFormValues(initialValues);
          window.scrollTo(0,0);
      })
      .catch(err => {
        console.log(err);
        setError({message:"Oops! Something went wrong.",variant:"danger"});
      })
    
  }

  useEffect(() => {
    contactSchema
      .validate(formValues)
      .then(isValid => setDisabled(!isValid))
      .catch(err => err);
  })

  return (
    <div>
      <Container>
        <Section>
          <h2><YellowSpan>Contact Us</YellowSpan></h2>
          <div className="paragraph">
            <p>Fill out the form below to send a message to this site's creator.</p>
          </div>
          <form style={{width:"100%", display:"flex", flexFlow:"column", alignItems:"center", justifyContent:"space-evenly"}}>
            <TextInput 
              name="subject"
              label="Subject"
              type="text"
              value={formValues.subject}
              error={formErrors.subject}
              onChange={handleChange}
            />
            <TextInput
              name="email"
              label="Email"
              type="text"
              value={formValues.email}
              error={formErrors.email}
              onChange={handleChange}
            />
            <TextArea
              name="body"
              value={formValues.body}
              error={formErrors.body}
              variant="no-clear"
              onChange={handleChange}
              placeholder="Enter your message..."
            />
            <Button onClick={handleSubmit} variant={disabled ? 'disabled' : ''}>Submit</Button>
          </form>
        </Section>
      </Container>
      {toastError &&
        <Toast onClick={() => setError(false)} variant={toastError.variant}>
          {toastError.message}
        </Toast>}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
    toastError: state.toastError,
  }
}

export default connect(mapStateToProps, { setError })(Contact)
