/* eslint-disable */
import { createStore } from 'vuex';

export default createStore({
  state: {
    lists: [],
  },
  getters: {
    getListById: (state) => (id) => {
      return state.lists.find((list) => list.id === id)
    },
    getItemById: (state) => ({ listId, itemId }) => {
      const list = state.lists.find((listTemp) => listTemp.id === listId);
      if (list) {
        return list.itemList.find((item) => item.id === itemId);
      }
      return null;
    },
  },
  mutations: {
    addItemToList(state, payload) {
      const {
        listId, itemId, amount, checked, color,
      } = payload;
      const list = state.lists.find((listTemp) => listTemp.id === listId);
      if (list) {
        list.itemList.push({
          id: itemId, amount, checked, color,
        });
      } else {
        state.lists.push({
          id: listId,
          itemList: [{
            id: itemId, amount, checked, color,
          }],
        });
      }
    },
    addList(state, newList) {
      state.lists.push(newList); // Add the new list to the lists array
    },
    updateItemInList(state, payload) {
      const { listId, itemId, newItem } = payload;
      const list = state.lists.find((listTemp) => listTemp.id === listId);
      if (list) {
        const item = list.itemList.find((itemTemp) => itemTemp.id === itemId);
        if (item) {
          Object.assign(item, newItem); // Update the item with new properties
          const checkedStatus = list.itemList.reduce((acc, curr) => acc + (curr.checked ? 1 : 0), 0);
          if (checkedStatus === list.itemList.length) {
            list.checked = 1; // All items are checked
          } else if (checkedStatus > 0) {
            list.checked = 2; // Some items are checked
          } else {
            list.checked = 0; // No items are checked
          }
        }
      }
    },
    updateItemsChecked(state, { id, checked }) {
      const list = state.lists.find((listTemp) => listTemp.id === id);

      if (list) {
        list.checked = checked;
        list.itemList.forEach((item) => {
          // eslint-disable-next-line
          item.checked = !!checked; // Set the checked state of each item
        });
      }
    },
    removeOneItem(state, payload) {
      const list = state.lists.find((listTemp) => listTemp.id === payload.listId);
      if (list) {
        const item = list.itemList.find((itemTemp) => itemTemp.id === payload.itemId);
        if (item) {
          item.amount -= 1;
        }
      }
    },
    changeItemQty(state, payload) {
      const list = state.lists.find((listTemp) => listTemp.id === payload.listId);
      if (list) {
        const item = list.itemList.find((itemTemp) => itemTemp.id === payload.itemId);
        if (item) {
          item.amount = payload.quantity;
        }
      }
    },
    changeItemColor(state, payload) {
      const list = state.lists.find((listTemp) => listTemp.id === payload.listId);
      if (list) {
        const item = list.itemList.find((itemTemp) => itemTemp.id === payload.itemId);
        if (item) {
          item.color = payload.color;
        }
      }
    },
  },
  actions: {
    addItem({ commit }, payload) {
      commit('addItemToList', payload); // Call the mutation with payload
    },
    updateItem({ commit }, payload) {
      commit('updateItemInList', payload); // Call the mutation with payload
    },
    addList({ commit }, payload) {
      commit('addList', payload); // Call the mutation with payload
    },
    updateItemsCheckedInList({ commit }, { id, checked }) {
      commit('updateItemsChecked', { id, checked }); // Call the mutation with listId and checked value
    },
    removeOneOfItem({ commit }, payload) {
      commit('removeOneItem', payload); // Call the mutation to remove one of item
    },
    changeItemQuantity({ commit }, payload) {
      commit('changeItemQty', payload);
    },
    changeItemColor({ commit }, payload) {
      commit('changeItemColor', payload);
    },
  },
  modules: {
  },
});
