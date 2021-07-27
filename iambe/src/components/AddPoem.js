import React from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import { axiosWithAuth, fetchCurrentUser } from '../api-client/auth';
import { getCurrentUser } from '../actions';

import Login from './Login';
import PoemForm from './styled/PoemForm';

const AddPoem = props => {
  const { currentUser, poems, getCurrentUser } = props;

  const history = useHistory();

  const handleSubmit = async formValues => {
    await axiosWithAuth()
      .post('/poems/poem', formValues)
      .then(async _ => getCurrentUser(await fetchCurrentUser()))
      .catch(err => console.log(err));
    
    history.push('/my-poems');
  }

  return (
    currentUser ? 
    <PoemForm editing={false} handleSubmit={handleSubmit} poems={poems} />
    :
    <Login uri='/save-poem'/>
  )
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
    poems: state.poems,
  }
}

export default connect(mapStateToProps, { getCurrentUser })(AddPoem)
