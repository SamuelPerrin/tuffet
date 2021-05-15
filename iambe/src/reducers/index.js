import * as actions from '../actions';

const initialState = {
  poetry: null,
  rhymes: null,
  rhymeCounts: null
}

const reducer = (state=initialState, action) => {
  switch(action.type){
    case actions.GET_RHYMES:
      return {
        ...state,
        poetry: action.payload.poetry,
        rhymes: action.payload.rhymes,
        rhymeCounts: action.payload.rhymeCounts,
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