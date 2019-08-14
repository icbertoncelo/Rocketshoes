import React from 'react';
import {
  MdAddCircleOutline,
  MdRemoveCircleOutline,
  MdDelete,
} from 'react-icons/md';

import { useSelector, useDispatch } from 'react-redux';
import { Creators as CartActions } from '../../store/ducks/cart';

import { formatPrice } from '../../util/format';
import { Container, ProductsTable, Total } from './styles';

export default function Cart() {
  const total = useSelector(state =>
    formatPrice(
      state.cart.products.reduce(
        (sumTotal, product) => sumTotal + product.price * product.amount,
        0
      )
    )
  );
  const cart = useSelector(state =>
    state.cart.products.map(product => ({
      ...product,
      subtotal: formatPrice(product.price * product.amount),
    }))
  );

  const dispatch = useDispatch();

  function handleIncrease({ id, amount }) {
    dispatch(CartActions.updateAmountRequest(id, amount + 1));
  }

  function handleDecrease({ id, amount }) {
    dispatch(CartActions.updateAmountRequest(id, amount - 1));
  }

  function handleRemove(id) {
    dispatch(CartActions.removeProduct(id));
  }

  return (
    <Container>
      <ProductsTable>
        <thead>
          <tr>
            <th />
            <th>PRODUCT</th>
            <th>QNT</th>
            <th>SUBTOTAL</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {cart.map(product => (
            <tr key={product.id}>
              <td>
                <img src={product.image} alt={product.title} />
              </td>
              <td>
                <strong>{product.title}</strong>
                <span>{product.priceFormatted}</span>
              </td>
              <td>
                <div>
                  <button
                    type="button"
                    onClick={() => {
                      handleDecrease(product);
                    }}
                  >
                    <MdRemoveCircleOutline size={20} color="#7159c1" />
                  </button>
                  <input type="number" readOnly value={product.amount} />
                  <button
                    type="button"
                    onClick={() => {
                      handleIncrease(product);
                    }}
                  >
                    <MdAddCircleOutline size={20} color="#7159c1" />
                  </button>
                </div>
              </td>
              <td>
                <strong>{product.subtotal}</strong>
              </td>
              <td>
                <button type="button" onClick={() => handleRemove(product.id)}>
                  <MdDelete size={20} color="#7159c1" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </ProductsTable>

      <footer>
        <button type="button">Finalize order</button>

        <Total>
          <span>TOTAL</span>
          <strong>{total}</strong>
        </Total>
      </footer>
    </Container>
  );
}
