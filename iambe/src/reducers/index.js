import * as actions from '../actions';

const initialState = {
  poetry:"",
}

const reducer = (state=initialState, action) => {
  switch(action.type){
    case actions.GET_RHYMES:
      return {
        ...state,
        poetry: action.payload
      }
    case actions.GET_METER:
      return {
        ...state,
        poetry: "in get meter with " + action.payload
      }
    default:
      return state
  }
}

export default reducer