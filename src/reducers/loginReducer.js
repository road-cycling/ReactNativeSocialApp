import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  AMETHOD_CHANGED,
  NAME_CHANGED,
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL
} from '../actions/types'

const INITIAL_STATE = {
  authMethod: 0,
  email: '',
  password: '',
  name: '',
  error: '',
  user: null,
  loading: false,
};

export default (state=INITIAL_STATE, action) => {
  switch(action.type) {

    case EMAIL_CHANGED:
      return {...state, email: action.payload};

    case PASSWORD_CHANGED:
      return {...state, password: action.payload};

    case AMETHOD_CHANGED:
      return {...state, authMethod: action.payload}

    case NAME_CHANGED:
      return {...state, name: action.payload}

    case LOGIN_USER:
      return {...state, loading: true, error: '' };

    case LOGIN_USER_SUCCESS:
      return { ...state, ...INITIAL_STATE, user: action.payload };

    case LOGIN_USER_FAIL:
      return { ...state, error: 'Authentication Failed', password: '', loading: false}


    default:
      return state;
  }
};
