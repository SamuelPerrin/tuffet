import React, { useState } from 'react';
import styled from 'styled-components';

import { BlueSpan, YellowSpan } from './Spans';
import ButtonRow from './ButtonRow';
import Button from './Button';
import Modal from './Modal';

const CardWrapper = styled.div`
  border: 1px solid ${props => props.theme.black};
  border-radius: 0.75rem;
  margin: 0.25rem;
  padding: 1rem;
  max-width:25rem;

  .read-indicator {
    background-color: ${props => props.theme.blue};
    border-radius:50%;
    width:10px;
    height:10px;
    margin-left:1rem;
    display:inline-block;
  }
`

const MessageCard = props => {
  const { message, handleRead, handleDelete, readMessages, ...rest } = props;
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  }

  const deleteMessage = (id) => {
    setShowModal(false);
    handleDelete(id);
    window.scrollTo(0,0);
  }

  return (
    !showModal ?
    <CardWrapper {...rest}>
      <h3 style={{display:"flex",justifyContent:"space-between"}}>
        <BlueSpan>{message.subject}</BlueSpan>
        {!message.read && !readMessages.includes(message.messageid) && <div className="read-indicator"/>}
      </h3>
      {message.user && message.email ? <p>from <YellowSpan>{message.user.username} ({message.email})</YellowSpan></p>
        :
        <>
        {message.user && <p>from <YellowSpan>{message.user.username}</YellowSpan></p>}
        {message.email && <p>from <YellowSpan>{message.email}</YellowSpan></p>}
        </>
      }
      <div className='paragraph'>
        {message.body.split('\n').map((b,i) => <p key={b+i}>{b}</p>)}
        <ButtonRow>
          {!message.read && !readMessages.includes(message.messageid) && <Button size='small' onClick={() => handleRead(message.messageid)}>Mark Read</Button>}
          <Button size='small' onClick={openModal}>Delete</Button>
        </ButtonRow>
      </div>
    </CardWrapper>
    :
    <Modal
      variant="delete"
      onConfirm={() => deleteMessage(message.messageid)}
      setShowModal={setShowModal}
    >
      Are you sure you want to delete this message?
    </Modal>
  )
}

export default MessageCard
