import { combineReducers } from 'redux';
import { REQUEST_LIST, SUCCESS_LIST, FAILURE_LIST, OPEN_QR_MODAL, CLOSE_QR_MODAL, SHOW_HISTORY, OPEN_NOTIFY, CLOSE_NOTIFY } from '../actions';

const initial = {
  status: 'init',
  error: false,
  list: [],
  history: [],
  isShowQrReader: true,
  notify: {
    isOpen: false,
    variant: 'info',
    message: ''
  }
};

const reducer = (state = initial, action) => {
  switch (action.type) {
  case REQUEST_LIST: {
    return { ...state, status: 'loading', error: false };
  }
  case SUCCESS_LIST: {
    return { ...state, status: 'done', error: false, list: action.payload.data, history: [...state.history, ...action.payload.data] };
  }
  case FAILURE_LIST: {
    return { ...state, status: 'error', error: true };
  }
  case OPEN_QR_MODAL: {
    return { ...state, isShowQrReader: true };
  }
  case CLOSE_QR_MODAL: {
    return { ...state, isShowQrReader: false };
  }
  case SHOW_HISTORY: {
    return { ...state, list: state.history };
  }
  case OPEN_NOTIFY: {
    return { ...state, notify: { ...action.payload, isOpen: true } };
  }
  case CLOSE_NOTIFY: {
    return { ...state, notify: { isOpen: false, message: '', variant: 'info' } };
  }
  default:
    return state;
  }
};

export default combineReducers({ reducer });
