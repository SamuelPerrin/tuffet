import * as actions from '../actions';

const initialState = {
  poetry: null,
  rhymes: null,
  rhymeTypeCounts: null,
  rhymeSchemeCounts: null,
  stanzaNum: null,
}

const reducer = (state=initialState, action) => {
  switch (action.type) {
    case actions.GET_RHYMES:
      return {
        ...state,
        poetry: action.payload.poetry,
        rhymes: action.payload.rhymes,
        rhymeTypeCounts: action.payload.rhymeTypeCounts,
        rhymeSchemeCounts: action.payload.rhymeSchemeCounts,
      }
    case actions.GET_RHYME_DETAILS:
      return {
        ...state,
        stanzaNum: action.payload.stanzaNum,
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