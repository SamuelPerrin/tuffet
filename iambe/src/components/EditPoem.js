import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { connect } from 'react-redux';

import { axiosWithAuth, fetchCurrentUser } from '../api-client/auth';
import { getCurrentUser, setError } from '../actions';

import PoemForm from './styled/PoemForm';

const EditPoem = props => {
  const { currentUser, getCurrentUser, setError } = props;
  const history = useHistory();
  const { poemid } = useParams();

  const handleSubmit = async formValues => {
    await axiosWithAuth()
      .put(`/poems/poem/${poemid}`, formValues)
      .then(async _ => getCurrentUser(await fetchCurrentUser()))
      .catch(err => {
        console.log(err);
        if (err.response.status === 401) setError("You might need to log in!");
        else setError("Something went wrong with saving that poem!");
      });
    
      history.push('/my-poems');
  }

  return (
    <PoemForm editing={true} handleSubmit={handleSubmit} poems={currentUser.poems.filter(p => p.poem.poemid == poemid).map(x => x.poem)} />
  )
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
  }
}

export default connect(mapStateToProps, { getCurrentUser, setError })(EditPoem)
