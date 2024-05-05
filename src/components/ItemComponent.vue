<template>
  <div class="item">
    <!-- eslint-disable-next-line -->
    <label class="container">
      Item {{ itemId }}

      <input type="checkbox" v-model="checked" @change="toggle">
      <span class="checkmark"></span>
    </label>
    <div class="item__properties">
        <input type="number" min="0" class="item__quantity" v-model="this.quantity" @change="changeItemQuantity">
        <input type="color" name="color" class="item__color" v-model="color">
      </div>
  </div>
</template>

<script>
import CheckboxMixin from '@/mixins/CheckboxMixin.vue';
import RandomNumMixin from '../mixins/RandomNumMixin.vue';

export default {
  props: ['itemId', 'listId'],
  mixins: [CheckboxMixin, RandomNumMixin],
  data() {
    return {
      checked: false,
      color: this.getRandomColor(),
      quantity: this.getRandomInt(0, 15),
    };
  },
  methods: {
    toggle() {
      if (this.quantity < 0) this.quantity = 0; // edge case for negative num inputs
      this.$store.dispatch('updateItem', {
        listId: this.listId,
        itemId: this.itemId,
        newItem: { amount: this.quantity, checked: this.checked, color: this.color },
      });
    },
    changeItemQuantity() {
      if (this.quantity < 0) {
        this.quantity = 0;
      }
      this.$store.dispatch('changeItemQuantity', { listId: this.listId, itemId: this.itemId, quantity: this.quantity });
    },
  },
  computed: {
    item() {
      return this.$store.getters.getItemById({ listId: this.listId, itemId: this.itemId });
    },
  },
  watch: {
    item: {
      deep: true,
      handler(newVal) {
        this.checked = newVal.checked;
        this.quantity = newVal.amount;
      },
    },
  },
  created() {
    this.$store.dispatch('addItem', {
      listId: this.listId,
      itemId: this.itemId,
      amount: this.quantity,
      checked: this.checked,
      color: this.color,
    });
  },
};

</script>

<style lang="scss">
.item {
  display: flex;
  justify-content: space-between;
  &__properties {
    display: flex;
    justify-content: space-between;
  }
  &__color {
    inline-size: unset;
    block-size: unset;
    width: 30px;
    height: 30px;
    margin-left: 20px;
    border: none;
    outline: none;
    background-color: transparent;
  }
  &__quantity {
    width: 30px;
    border: none;
    outline: none;
    background-color: transparent;
    font-size: 22px;
  }
}

</style>
