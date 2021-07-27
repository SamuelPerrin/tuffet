import React, { useState } from 'react';

import Container from './Container';
import Section from './Section';
import { RedSpan } from './Spans';
import Button from './Button';
import TextArea from './TextArea';

const PoemForm = props => {
  const { handleSubmit, poems, editing } = props;
  
  const initialValues = {
    title: editing ? poems[0].title : "",
    author: editing ? poems[0].author : "",
    text: editing ? poems[0].text : poems[0],
  }
  
  const [formValues, setFormValues] = useState(initialValues);
  
  const handleChange = e => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  }

  const onSubmit = e => {
    e.preventDefault();
    handleSubmit(formValues);
  }

  return (
    <div>
      <Container>
        <Section>
          <h2><RedSpan>Save This Poem</RedSpan></h2>
          <div className='paragraph'>
            <p>Fill out the form below to save this poem so you can come back to it later.</p>
          </div>
          <form onSubmit={onSubmit} style={{display:"flex", flexFlow:"column", alignItems:"center", justifyContent:"space-evenly"}}>
            <label style={{display:"flex", flexFlow:"row", alignItems:"center", justifyContent:"space-evenly", margin:"1rem"}}>
              Title:&nbsp;
              <input 
                onChange={handleChange}
                type='text'
                name='title'
                value={formValues.title}
              />
            </label>
            <label style={{display:"flex", flexFlow:"row", alignItems:"center", justifyContent:"space-evenly", margin:"1rem"}}>
              Author:&nbsp;
              <input
                onChange={handleChange}
                type='text'
                name='author'
                value={formValues.author}
              />
            </label>
            <TextArea
              onChange={handleChange}
              name='text'
              type='text'
              value={formValues.text}
              placeholder="Text"
            />
            <Button>Save Poem</Button>
          </form>
        </Section>
      </Container>
    </div>
  )
}

export default PoemForm;
