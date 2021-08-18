import React, { useState } from 'react';
import styled from 'styled-components';

import Container from './Container';
import Section from './Section';
import { RedSpan } from './Spans';
import Button from './Button';
import TextArea from './TextArea';
import TextInput from './TextInput';

const StyledForm = styled.form`
  width:100%;
  display:flex;
  flex-flow:column;
  align-items:center;
  justify-content:space-evenly;
`

const PoemForm = props => {
  const { handleSubmit, poems, editing } = props;
  
  const initialValues = {
    title: editing ? poems[0].title : "",
    author: editing ? poems[0].author : "",
    text: editing ? poems[0].text : poems[0],
    publication: editing ? poems[0].publication : "",
    notes: editing ? poems[0].notes : "",
  }
  
  const [formValues, setFormValues] = useState(initialValues);
  
  const handleChange = e => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  }

  const clearText = _ => {
    setFormValues({
      ...formValues,
      text: "",
    })
  }

  const onSubmit = e => {
    e.preventDefault();
    handleSubmit(formValues);
  }

  return (
    <div>
      <Container>
        <Section>
          <h2><RedSpan>{editing ? "Edit Poem" : "Save Poem"}</RedSpan></h2>
          {editing || <div className='paragraph'>
            <p>Fill out the form below to save this poem so you can come back to it later.</p>
          </div>}
          <StyledForm onSubmit={onSubmit}>
            <TextInput
              label='Title'
              name='title'
              type='text'
              value={formValues.title}
              onChange={handleChange}
            />
            <TextInput
              label='Author'
              name='author'
              type='text'
              value={formValues.author}
              onChange={handleChange}
            />
            <TextInput
              label='Year of publication'
              name='publication'
              type='text'
              value={formValues.publication}
              onChange={handleChange}
            />
            <TextArea
              onChange={handleChange}
              name='text'
              type='text'
              value={formValues.text}
              setValue={clearText}
              placeholder="Text"
            />
            <Button type="submit" size="small">Save {editing ? "Changes" : "Poem"}</Button>
          </StyledForm>
        </Section>
      </Container>
    </div>
  )
}

export default PoemForm;
