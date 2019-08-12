import produce from 'immer';

/**
 * Types
 */
export const Types = {
  ADD: '@cart/ADD',
  REMOVE: '@cart/REMOVE',
  UPDATE_AMOUNT: '@cart/UPDATE_AMOUNT',
};

/**
 * Reducer
 */
const INITIAL_STATE = {
  products: [],
};

export default function cart(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.ADD:
      return produce(state, (draft) => {
        const productIndex = draft.products.findIndex(
          product => product.id === action.payload.product.id,
        );

        if (productIndex >= 0) {
          draft.products[productIndex].amount += 1;
        } else {
          draft.products.push({
            ...action.payload.product,
            amount: 1,
          });
        }
      });
    case Types.REMOVE:
      return produce(state, (draft) => {
        const productIndex = draft.products.findIndex(product => product.id === action.payload.id);

        if (productIndex >= 0) {
          draft.products.splice(productIndex, 1);
        }
      });
    case Types.UPDATE_AMOUNT: {
      if (action.payload.amount <= 0) {
        return state;
      }
      return produce(state, (draft) => {
        const productIndex = draft.products.findIndex(product => product.id === action.payload.id);

        if (productIndex >= 0) {
          draft.products[productIndex].amount = Number(action.payload.amount);
        }
      });
    }
    default:
      return state;
  }
}

/**
 * Actions
 */
export const Creators = {
  addProduct: product => ({
    type: Types.ADD,
    payload: { product },
  }),
  removeProduct: id => ({
    type: Types.REMOVE,
    payload: { id },
  }),
  updateAmount: (id, amount) => ({
    type: Types.UPDATE_AMOUNT,
    payload: { id, amount },
  }),
};
