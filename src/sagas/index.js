import { call, put, fork, take } from 'redux-saga/effects';
import { successList, failureList, SEARCH_SURUGAYA_FROM_QR, closeQrModal, requestList } from '../actions';
import API from '../api';

function* handleSearchQr() {
  while (true) {
    const action = yield take(SEARCH_SURUGAYA_FROM_QR);
    // モーダルをクローズする
    yield put(closeQrModal());
    // ローディング
    yield put(requestList());
    try {
      const cardName = yield call(API.getCardInfoFromQr, action.payload);
      console.log(cardName);
      if (cardName.error) throw cardName.error;

      const surugayaResult = yield call(API.getSurugaya, cardName.data);
      console.log(surugayaResult);
      if (surugayaResult.error) throw surugayaResult.error;
      yield put(successList({ data: surugayaResult.data }));
    } catch (error) {
      yield put(failureList({ errorMessage: error }));
    }
  }
}

export default function* rootSaga() {
  yield fork(handleSearchQr);
}
