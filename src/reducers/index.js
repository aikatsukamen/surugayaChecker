import { combineReducers } from 'redux';
import { REQUEST_LIST, SUCCESS_LIST, FAILURE_LIST, OPEN_QR_MODAL, CLOSE_QR_MODAL } from '../actions';

const initial = {
  status: 'init',
  error: false,
  list: [],
  isShowQrReader: true
};

const reducer = (state = initial, action) => {
  switch (action.type) {
  case REQUEST_LIST: {
    return { ...state, status: 'loading', error: false };
  }
  case SUCCESS_LIST: {
    return { ...state, status: 'done', error: false, list: action.payload.data };
  }
  case FAILURE_LIST: {
    alert(action.payload.errorMessage);
    return { ...state, status: 'error', error: true };
  }
  case OPEN_QR_MODAL: {
    return { ...state, isShowQrReader: true };
  }
  case CLOSE_QR_MODAL: {
    return { ...state, isShowQrReader: false };
  }
  default:
    return state;
  }
};

export default combineReducers({ reducer });
