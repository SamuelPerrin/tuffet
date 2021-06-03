import * as actions from '../actions';

const initialState = {
  poetry: null,
  rhymes: null,
  rhymeTypeCounts: null,
  rhymeSchemeCounts: null,
  stanzaNum: null,
  rt: null,
  stanzaMeters: null,
  stanzaMeterCounts: null,
  mt: null,
}

const reducer = (state=initialState, action) => {
  switch (action.type) {
    case actions.GET_RHYMES:
      return {
        ...state,
        poetry: action.payload.poetry,
        poems: action.payload.poems,
        rhymes: action.payload.rhymes,
        rhymeTypeCounts: action.payload.rhymeTypeCounts,
        rhymeSchemeCounts: action.payload.rhymeSchemeCounts,
      }
    case actions.GET_RHYME_SCHEME_DETAILS:
      return {
        ...state,
        stanzaNum: action.payload.stanzaNum,
      }
    case actions.GET_RHYME_TYPE_DETAILS:
      return {
        ...state,
        rt: action.payload.rt,
      }
    case actions.GET_METER:
      return {
        ...state,
        poetry: action.payload.poetry,
        poems: action.payload.poems,
        stanzaMeters: action.payload.stanzaMeters,
        stanzaMeterCounts: action.payload.stanzaMeterCounts,
      }
    case actions.GET_LINE_METER_DETAILS:
      return {
        ...state,
        stanzaNum: action.payload.stanzaNum,
      }
    case actions.GET_METER_TYPE_DETAILS:
      return {
        ...state,
        mt: action.payload.mt,
      }
    default:
      return state
  }
}

export default reducer