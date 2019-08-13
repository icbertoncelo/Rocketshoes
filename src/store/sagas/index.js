import { all } from 'redux-saga/effects';

import cart from './cart';

export default function* rootSaga() {
  yield all([cart]);
}
