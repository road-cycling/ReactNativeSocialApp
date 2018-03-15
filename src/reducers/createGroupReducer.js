import {
  GROUP_CREATE_NAME_CHANGED,
  GROUP_CREATE_ORGANIZER_CHANGED,
  GROUP_CREATE_SUMMARY_CHANGED,
  GROUP_CREATE_PUBLIC_CHANGED,
  GROUP_CREATE_LOADING_CHANGED,
  GROUP_CREATE_PRESS
} from '../actions/types';

const INITIAL_STATE = {
  name: '',
  organizer: '',
  summary: '',
  isPublic: 1,
  loading: 'false'
}
// 0 is private

export default (state=INITIAL_STATE, action) => {
  
  switch(action.type) {

    case GROUP_CREATE_NAME_CHANGED:
      return {...state, name: action.payload }

    case GROUP_CREATE_ORGANIZER_CHANGED:
      return {...state, organizer: action.payload}

    case GROUP_CREATE_SUMMARY_CHANGED:
      return {...state, summary: action.payload}

    case GROUP_CREATE_PUBLIC_CHANGED:
      return {...state, isPublic: action.payload}

    case GROUP_CREATE_LOADING_CHANGED:
      return {...state, loading: action.payload}

    case GROUP_CREATE_PRESS:
      return {...state, INITIAL_STATE, loading: 'true'}

    default:
      return state;
  }
}
