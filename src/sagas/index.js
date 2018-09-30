import { call, put, fork, take } from 'redux-saga/effects';
import { successList, failureList, SEARCH_SURUGAYA_FROM_QR } from '../actions';
import API from '../api';

function* handleSearchQr() {
  while (true) {
    const action = yield take(SEARCH_SURUGAYA_FROM_QR);
    const cardName = yield call(API.getCardInfoFromQr, action.payload);
    // TODO: エラーのとき

    const surugayaResult = yield call(API.getSurugaya, cardName.data);
    if (surugayaResult.data && !surugayaResult.error) {
      yield put(successList({ data: surugayaResult.data }));
    } else {
      yield put(failureList({ error: surugayaResult.error }));
    }
  }
}

export default function* rootSaga() {
  yield fork(handleSearchQr);
}
