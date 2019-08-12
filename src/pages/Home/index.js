import React from 'react';
import { MdAddShoppingCart } from 'react-icons/md';

import { ProductList, Product, ShoppButton } from './styles';

export default function Home() {
  return (
    <ProductList>
      <Product>
        <img
          src="https://static.netshoes.com.br/produtos/tenis-asics-gel-evasion-masculino/26/D18-4157-026/D18-4157-026_detalhe2.jpg?resize=326:*"
          alt="Tênis"
        />

        <strong>Tênis para corrida</strong>
        <span>R$199,00</span>

        <ShoppButton type="button">
          <div>
            <MdAddShoppingCart size={16} color="#fff" /> 3
          </div>
          <span>Adicionar ao carrinho</span>
        </ShoppButton>
      </Product>
    </ProductList>
  );
}
