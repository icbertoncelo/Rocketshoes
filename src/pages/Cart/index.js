import React from 'react';
import PropTypes from 'prop-types';
import {
  MdAddCircleOutline,
  MdRemoveCircleOutline,
  MdDelete,
} from 'react-icons/md';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as CartActions } from '../../store/ducks/cart';

import { formatPrice } from '../../util/format';
import { Container, ProductsTable, Total } from './styles';

function Cart({ cart, total, removeProduct, updateAmountRequest }) {
  function handleIncrease({ id, amount }) {
    updateAmountRequest(id, amount + 1);
  }

  function handleDecrease({ id, amount }) {
    updateAmountRequest(id, amount - 1);
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
                <button type="button" onClick={() => removeProduct(product.id)}>
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

Cart.propTypes = {
  removeProduct: PropTypes.func.isRequired,
  updateAmountRequest: PropTypes.func.isRequired,
  total: PropTypes.string.isRequired,
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      image: PropTypes.string,
      title: PropTypes.string,
      priceFormatted: PropTypes.string,
      amount: PropTypes.number,
    })
  ).isRequired,
};

const mapStateToProps = state => ({
  cart: state.cart.products.map(product => ({
    ...product,
    subtotal: formatPrice(product.price * product.amount),
  })),
  total: formatPrice(
    state.cart.products.reduce(
      (total, product) => total + product.price * product.amount,
      0
    )
  ),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);
