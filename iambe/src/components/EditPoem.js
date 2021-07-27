import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { connect } from 'react-redux';

import { axiosWithAuth, fetchCurrentUser } from '../api-client/auth';
import { getCurrentUser } from '../actions';

import PoemForm from './styled/PoemForm';

const EditPoem = props => {
  const { currentUser, getCurrentUser } = props;
  const history = useHistory();
  const { poemid } = useParams();

  const handleSubmit = async formValues => {
    await axiosWithAuth()
      .put(`/poems/poem/${poemid}`, formValues)
      .then(async _ => getCurrentUser(await fetchCurrentUser()))
      .catch(err => console.log(err));
    
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

export default connect(mapStateToProps, { getCurrentUser })(EditPoem)
