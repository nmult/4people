export default {
  actions: {
    add({commit}, { id }) {
      commit('ADD_TO_CART', { id });
    },
    remove({commit}, {id}) {
      commit('REMOVE_FROM_CART', { id });
    },
    changeQuantity({ dispatch, commit, getters, rootGetters }, { id, quantity }) {
      commit('UPDATE_QUANTITY', { id, quantity });
    },
  },

  mutations: {
    ADD_TO_CART(state, {id}) {
      const addedProduct = state.addedProducts.find(p => p.id === id);

      if (!addedProduct) {
        state.addedProducts.push({
          id,
          quantity: 1,
        })
      } else {
        addedProduct.quantity++;
      }
    },
    REMOVE_FROM_CART(state, { id }) {
      const removedProductIndex = state.addedProducts.find(p => p.id === id);

      state.addedProducts.splice(removedProductIndex, 1);
    },
    UPDATE_QUANTITY(state, { id, quantity }) {
      const editedProduct = state.addedProducts.find(p => p.id === id);

      editedProduct.quantity = quantity;
    },
  },

  state: {
    addedProducts: [],
  },

  getters: {
    cartProducts(state, getters, rootState, rootGetters) {
      const products = rootGetters?.products || [];

      return state.addedProducts.map(({id, quantity}) => {
        const product = products[id];

        if (!product) return [];

        return {
          name:  product.name,
          price: product.price,
          id,
          quantity,
        }
      });
    },
    totalAmount(state, getters) {
      return getters.cartProducts.reduce((acc, {price, quantity}) => {
        return parseFloat(acc) + parseFloat(price * quantity);
      }, 0).toFixed(2);
    },
  }
}