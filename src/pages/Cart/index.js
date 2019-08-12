import React from 'react';
import { MdAddCircleOutline, MdRemoveCircleOutline, MdDelete } from 'react-icons/md';

import { Container, ProductsTable, Total } from './styles';

export default function Cart() {
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
          <tr>
            <td>
              <img
                src="https://static.netshoes.com.br/produtos/tenis-asics-gel-evasion-masculino/26/D18-4157-026/D18-4157-026_detalhe2.jpg?resize=326:*"
                alt="Shoes"
              />
            </td>
            <td>
              <strong>Tênis para correr</strong>
              <span>R$199,00</span>
            </td>
            <td>
              <div>
                <button type="button">
                  <MdAddCircleOutline size={20} color="#7159c1" />
                </button>
                <input type="number" readOnly value={2} />
                <button type="button">
                  <MdRemoveCircleOutline size={20} color="#7159c1" />
                </button>
              </div>
            </td>
            <td>
              <strong>R$398,00</strong>
            </td>
            <td>
              <button type="button">
                <MdDelete size={20} color="#7159c1" />
              </button>
            </td>
          </tr>
        </tbody>
      </ProductsTable>

      <footer>
        <button type="button">Finalize order</button>

        <Total>
          <span>TOTAL</span>
          <strong>R$456,98</strong>
        </Total>
      </footer>
    </Container>
  );
}
