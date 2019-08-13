import produce from 'immer';

/**
 * Types
 */
export const Types = {
  ADD_REQUEST: '@cart/ADD_REQUEST',
  ADD_SUCCESS: '@cart/ADD_SUCCESS',
  REMOVE: '@cart/REMOVE',
  UPDATE_AMOUNT_REQUEST: '@cart/UPDATE_AMOUNT_REQUEST',
  UPDATE_AMOUNT_SUCCESS: '@cart/UPDATE_AMOUNT_SUCCESS',
};

/**
 * Reducer
 */
const INITIAL_STATE = {
  products: [],
};

export default function cart(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.ADD_SUCCESS:
      return produce(state, draft => {
        const { product } = action.payload;

        draft.products.push(product);
      });
    case Types.REMOVE:
      return produce(state, draft => {
        const productIndex = draft.products.findIndex(
          product => product.id === action.payload.id
        );

        if (productIndex >= 0) {
          draft.products.splice(productIndex, 1);
        }
      });
    case Types.UPDATE_AMOUNT_SUCCESS: {
      return produce(state, draft => {
        const productIndex = draft.products.findIndex(
          product => product.id === action.payload.id
        );

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
  addProductRequest: id => ({
    type: Types.ADD_REQUEST,
    payload: { id },
  }),
  addProductSuccess: product => ({
    type: Types.ADD_SUCCESS,
    payload: { product },
  }),
  removeProduct: id => ({
    type: Types.REMOVE,
    payload: { id },
  }),
  updateAmountRequest: (id, amount) => ({
    type: Types.UPDATE_AMOUNT_REQUEST,
    payload: { id, amount },
  }),
  updateAmountSuccess: (id, amount) => ({
    type: Types.UPDATE_AMOUNT_SUCCESS,
    payload: { id, amount },
  }),
};
