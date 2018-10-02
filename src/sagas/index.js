import { call, put, fork, take } from 'redux-saga/effects';
import { successList, failureList, SEARCH_SURUGAYA_FROM_QR, closeQrModal, requestList, openNotify, closeNotify } from '../actions';
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
      if (cardName.error) throw cardName.error;
      yield put(closeNotify());
      yield put(openNotify({ message: cardName.data, variant: 'info' }));

      const surugayaResult = yield call(API.getSurugaya, cardName.data);
      console.log(surugayaResult);
      if (surugayaResult.error) throw surugayaResult.error;
      yield put(successList({ data: surugayaResult.data }));
      yield put(closeNotify());
      yield put(openNotify({ message: '取得完了しました。', variant: 'success' }));
    } catch (error) {
      yield put(closeNotify());
      yield put(failureList({ errorMessage: error }));
      yield put(openNotify({ message: error, variant: 'error' }));
    }
  }
}

export default function* rootSaga() {
  yield fork(handleSearchQr);
}
