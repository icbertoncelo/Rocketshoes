import {
  call, put, all, takeLatest, select,
} from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '../../services/api';
import { formatPrice } from '../../util/format';

import { Creators as CartActions, Types as CartTypes } from '../ducks/cart';

export function* addProduct({ payload: { id } }) {
  const productExists = yield select(state => state.cart.products.find(product => product.id === id));

  const stock = yield call(api.get, `stock/${id}`);
  const { amount: stockAmount } = stock.data;
  const currentAmount = productExists ? productExists.amount : 0;

  const amout = currentAmount + 1;

  if (amout > stockAmount) {
    toast.error('Amount in stock is insufficient');
    return;
  }

  if (productExists) {
    yield put(CartActions.updateAmount(id, amout));
  } else {
    const response = yield call(api.get, `products/${id}`);

    const data = {
      ...response.data,
      amount: 1,
      priceFormatted: formatPrice(response.data.price),
    };

    yield put(CartActions.addProductSuccess(data));
  }
}

/**
 * All functions
 */
export default all([takeLatest(CartTypes.ADD_REQUEST, addProduct)]);
