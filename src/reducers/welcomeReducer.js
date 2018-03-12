import {
  IMAGE_UPLOAD_WELCOME,
  NAME_CHANGE_WELCOME,
  LOADING_CHANGE_WELCOME
} from '../actions/types'

const INITIAL_STATE = {
  uri: '',
  name: '',
  loading: false,
};

export default (state=INITIAL_STATE, action) => {
  switch(action.type) {

    case IMAGE_UPLOAD_WELCOME:
      return {...state, uri: action.payload};

    case NAME_CHANGE_WELCOME:
      return {...state, name: action.payload};

    case LOADING_CHANGE_WELCOME:
      return {...state, loading: action.payload}

    default:
      return state;
  }
};
