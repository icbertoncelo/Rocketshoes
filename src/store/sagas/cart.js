import {
  call, put, all, takeLatest, select,
} from 'redux-saga/effects';
import { toast } from 'react-toastify';

import history from '../../services/history';
import api from '../../services/api';
import { formatPrice } from '../../util/format';

import { Creators as CartActions, Types as CartTypes } from '../ducks/cart';

function* addProduct({ payload: { id } }) {
  const productExists = yield select(state => state.cart.products.find(product => product.id === id));

  const stock = yield call(api.get, `stock/${id}`);
  const { amount: stockAmount } = stock.data;
  const currentAmount = productExists ? productExists.amount : 0;

  const amount = currentAmount + 1;

  if (amount > stockAmount) {
    toast.error('Amount in stock is insufficient');
    return;
  }

  if (productExists) {
    yield put(CartActions.updateAmountSuccess(id, amount));
  } else {
    const response = yield call(api.get, `products/${id}`);

    const data = {
      ...response.data,
      amount: 1,
      priceFormatted: formatPrice(response.data.price),
    };

    yield put(CartActions.addProductSuccess(data));
    history.push('/cart');
  }
}

function* updateProduct({ payload: { id, amount } }) {
  if (amount <= 0) return;

  const stock = yield call(api.get, `stock/${id}`);
  const { amount: stockAmount } = stock.data;

  if (amount > stockAmount) {
    toast.error('Amount in stock is insufficient');
    return;
  }

  yield put(CartActions.updateAmountSuccess(id, amount));
}

/**
 * All functions
 */
export default all([
  takeLatest(CartTypes.ADD_REQUEST, addProduct),
  takeLatest(CartTypes.UPDATE_AMOUNT_REQUEST, updateProduct),
]);
