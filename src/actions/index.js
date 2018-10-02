import { createAction } from 'redux-actions';
// リストの取得
export const REQUEST_LIST = 'REQUEST_LIST';
export const SUCCESS_LIST = 'SUCCESS_LIST';
export const FAILURE_LIST = 'FAILURE_LIST';
export const requestList = createAction(REQUEST_LIST);
export const successList = createAction(SUCCESS_LIST);
export const failureList = createAction(FAILURE_LIST);

// ナビゲーションの選択
export const CHANGE_VIEW = 'CHANGE_VIEW';
export const changeView = createAction(CHANGE_VIEW);

// localStorageからデータのセーブとロード
export const LOAD_DATA = 'LOAD_DATA';
export const loadData = createAction(LOAD_DATA);
export const SAVE_DATA = 'SAVE_DATA';
export const saveData = createAction(SAVE_DATA);

// 所持リストの更新
export const UPDATE_HAVE_LIST = 'UPDATE_HAVE_LIST';
export const updateHaveList = createAction(UPDATE_HAVE_LIST);

// QR読み込みモーダルの開閉
export const OPEN_QR_MODAL = 'OPEN_QR_MODAL';
export const openQrModal = createAction(OPEN_QR_MODAL);
export const CLOSE_QR_MODAL = 'CLOSE_QR_MODAL';
export const closeQrModal = createAction(CLOSE_QR_MODAL);

// QR読み込み時の検索処理
export const SEARCH_SURUGAYA_FROM_QR = 'SEARCH_SURUGAYA_FROM_QR';
export const searchSurugayaFromQr = createAction(SEARCH_SURUGAYA_FROM_QR);

// 履歴表示
export const SHOW_HISTORY = 'SHOW_HISTORY';
export const showHistory = createAction(SHOW_HISTORY);

// 通知欄表示
export const OPEN_NOTIFY = 'OPEN_NOTIFY';
export const openNotify = createAction(OPEN_NOTIFY);
export const CLOSE_NOTIFY = 'CLOSE_NOTIFY';
export const closeNotify = createAction(CLOSE_NOTIFY);
