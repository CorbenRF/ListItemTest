<template>
  <div class="list">
    <details>
    <summary aria-labelledby="list_dropdown">
    <!-- eslint-disable-next-line -->
      <label class="container">
        {{ listName }}
      <input type="checkbox" v-model="checked" @change="toggleList">
      <!-- {{ state  }} -->
      <span v-if="state !== 2" class="checkmark"></span>
          <span class="checkmark indeterminate" v-else></span>
    </label>

      </summary>
      <div class="list__item" v-for="item in this.numberOfItems" :key="item">
        <ItemComponent :itemId="item" :listId="this.list_id"/>

      </div>
</details>
  </div>
</template>

<script>
import CheckboxMixin from '@/mixins/CheckboxMixin.vue';
import RandomNumMixin from '../mixins/RandomNumMixin.vue';
import ItemComponent from './ItemComponent.vue';

export default {
  props: ['listName', 'list_id'],
  components: { ItemComponent },
  mixins: [RandomNumMixin, CheckboxMixin],
  data() {
    return {
      checked: false, // checkbox control
      state: 0,
      totalItemsCheckedInList: 0,
      partialCheckbox: false,
    };
  },
  computed: {
    numberOfItems() {
      return this.getRandomInt(4, 10);
    },
    checkPartialCheckbox() {
      return this.partialCheckbox;
    },
    item() {
      return this.$store.getters.getListById(this.list_id);
    },
  },
  watch: {
    item: {
      deep: true,
      handler(newVal) {
        this.state = newVal.checked;
        this.checked = !!this.state;
      },
    },
  },
  methods: {
    toggleList() {
      this.state = this.checked ? 1 : 0;
      this.$store.dispatch('updateItemsCheckedInList', { id: this.list_id, checked: this.state ? 1 : 0 });
    },
  },
  created() {
    this.$store.dispatch('addList', {
      id: this.list_id,
      itemList: [],
      checked: this.state,
    });
  },
};

</script>

<style lang="scss">
.list {
  display: flex;
  &__item {
    width: 70%;
    margin-left: auto;
    margin-right: auto;
  }
}

//custom summary accordeon
summary::-webkit-details-marker{display:none;}
summary::-moz-list-bullet{list-style-type:none;}
summary::marker{display:none;}
summary {
   display:inline-block;
   padding: .3em .6em .3em 1.5em;
   font-size:1.4em;
   cursor: pointer;
   position: relative;
}
summary:before {
  left: .3em;
  top: .4em;
  color: transparent;
  background:url("data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjM0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIzNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNOC41OSAxNi4zNGw0LjU4LTQuNTktNC41OC00LjU5TDEwIDUuNzVsNiA2LTYgNnoiLz48L3N2Zz4=") no-repeat 50% 50% / 1em 1em;
  width: 1em;
  height: 1em;
  content: "";
  position: absolute;
  transition: transform .5s;
}
details[open] > summary:before {
  transform: rotateZ(90deg);
}
summary ~ * {
   padding:0 1em 0 1em;
}
details[open] summary ~ *{
  animation: sweep .5s ease-in-out;
}
@keyframes sweep {
  0%    {opacity: 0;}
  100%  {opacity: 1;}
}
summary:focus {
  outline:0;
  // box-shadow: inset 0 0 1px rgba(0,0,0,0.3), inset 0 0 2px rgba(0,0,0,0.3);
}
details{
  display:flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: .5rem;
}
</style>
