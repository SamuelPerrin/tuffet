import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { setError, setMessages } from '../actions';
import { axiosWithAuth } from '../api-client/auth';

import Container from './styled/Container';
import Section from './styled/Section';
import { RedSpan, YellowSpan } from './styled/Spans';
import Paginator from './styled/Paginator';
import MessageCard from './styled/MessageCard';
import Toast from './styled/Toast';
import Spinner from './styled/Spinner';

const AdminDash = props => {
  const { currentUser, messages, toastError, setError } = props;
  const [loading, setLoading] = useState(false);
  const [deletedId, setDeletedId] = useState(0);
  const messagesToRender = useRef(messages);
  const [readMessages, setReadMessages] = useState([]);

  useEffect(() => {
    messagesToRender.current = messages;
  }, [loading, deletedId, messages])

  const handleRead = async (id) => {
    setReadMessages([...readMessages, id]);

    const updatedMessage = messages.filter(m => m.messageid == id);
    updatedMessage.read = true;

    await axiosWithAuth()
      .put(`/messages/message/${id}`)
      .then(_ => setMessages([...messagesToRender.current.filter(m => m.messageid != id), updatedMessage]))
      .catch(_ => setError({message:"Something went wrong.", variant:"danger"}));
  }

  const handleDelete = async (id) => {
    setLoading(true);
    setMessages(messagesToRender.current.filter(m => m.messageid != id))
    await axiosWithAuth()
      .delete(`/messages/message/${id}`)
      .then(res => console.log(res))
      .catch(err => {
        console.log(err);
        setError({message:"Something went wrong with that deletion.", variant:"danger"});
      })
    setLoading(false);
    setDeletedId(id);
  }

  return (
    currentUser.role === "ADMIN" ?
    <div>
      <Container>
        <Section>
          <h2><YellowSpan>Welcome, {currentUser.username}!</YellowSpan></h2>
          <div style={{display:"flex", flexFlow:"row wrap", justifyContent:"space-evenly"}}>
            {!loading ?
              <Paginator
                data={messagesToRender.current.filter(m => m.messageid != deletedId).sort((a,b) => b.messageid - a.messageid)}
                perPage={12}
                Item={MessageCard}
                handleRead={handleRead}
                handleDelete={handleDelete}
                readMessages={readMessages}
                variant="vertical"
              />
              :
              <Spinner />}
          </div>
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
    :
    <div>
      <Container>
        <Section>
          <h2><RedSpan>Oops...</RedSpan></h2>
          <p>You need to <Link to='/login'>login</Link>.</p>
        </Section>
      </Container>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
    messages: state.messages,
    toastError: state.toastError,
  }
}

export default connect(mapStateToProps, { setError, setMessages })(AdminDash);
