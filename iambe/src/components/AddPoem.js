import React from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import { axiosWithAuth, fetchCurrentUser } from '../api-client/auth';
import { getCurrentUser, setError } from '../actions';

import Login from './Login';
import PoemForm from './styled/PoemForm';

const AddPoem = props => {
  const { currentUser, poems, getCurrentUser, setError } = props;

  const history = useHistory();

  const handleSubmit = async formValues => {
    await axiosWithAuth()
      .post('/poems/poem', formValues)
      .then(async _ => getCurrentUser(await fetchCurrentUser()))
      .catch(err => {
        console.log(err);
        if (err.response.status === 401) setError("You might need to log in!");
        else setError("Something went wrong with saving that poem!");
      });
    
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

export default connect(mapStateToProps, { getCurrentUser, setError })(AddPoem)
