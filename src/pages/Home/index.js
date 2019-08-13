import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MdAddShoppingCart } from 'react-icons/md';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as CartActions } from '../../store/ducks/cart';

import { formatPrice } from '../../util/format';
import api from '../../services/api';

import { ProductList, Product, ShoppButton } from './styles';

class Home extends Component {
  static propTypes = {
    addProductRequest: PropTypes.func.isRequired,
    amount: PropTypes.shape({
      id: PropTypes.number,
      amount: PropTypes.number,
    }).isRequired,
  };

  state = {
    products: [],
  };

  async componentDidMount() {
    const response = await api.get('/products');

    const data = response.data.map(product => ({
      ...product,
      priceFormatted: formatPrice(product.price),
    }));

    this.setState({ products: data });
  }

  handleAddProduct = id => {
    const { addProductRequest } = this.props;

    addProductRequest(id);
  };

  render() {
    const { products } = this.state;
    const { amount } = this.props;

    return (
      <ProductList>
        {products.map(product => (
          <Product key={product.id}>
            <img src={product.image} alt={product.title} />

            <strong>{product.title}</strong>
            <span>{product.priceFormatted}</span>

            <ShoppButton
              type="button"
              onClick={() => this.handleAddProduct(product.id)}
            >
              <div>
                <MdAddShoppingCart size={16} color="#fff" />{' '}
                {amount[product.id] || 0}
              </div>
              <span>Adicionar ao carrinho</span>
            </ShoppButton>
          </Product>
        ))}
      </ProductList>
    );
  }
}

const mapStateToProps = state => ({
  amount: state.cart.products.reduce((amount, product) => {
    amount[product.id] = product.amount;

    return amount;
  }, {}),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
