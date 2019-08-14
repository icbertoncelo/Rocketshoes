import React, { useState, useEffect } from 'react';
import { MdAddShoppingCart } from 'react-icons/md';

import { useSelector, useDispatch } from 'react-redux';
import { Creators as CartActions } from '../../store/ducks/cart';

import { formatPrice } from '../../util/format';
import api from '../../services/api';

import { ProductList, Product, ShoppButton } from './styles';

export default function Home() {
  const [products, setProducts] = useState([]);

  const amount = useSelector(state =>
    state.cart.products.reduce((sumAmount, product) => {
      sumAmount[product.id] = product.amount;

      return sumAmount;
    }, {})
  );

  const dispatch = useDispatch();

  useEffect(() => {
    async function loadProducts() {
      const response = await api.get('/products');

      const data = response.data.map(product => ({
        ...product,
        priceFormatted: formatPrice(product.price),
      }));

      setProducts(data);
    }

    loadProducts();
  }, []);

  function handleAddProduct(id) {
    dispatch(CartActions.addProductRequest(id));
  }

  return (
    <ProductList>
      {products.map(product => (
        <Product key={product.id}>
          <img src={product.image} alt={product.title} />

          <strong>{product.title}</strong>
          <span>{product.priceFormatted}</span>

          <ShoppButton
            type="button"
            onClick={() => handleAddProduct(product.id)}
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
