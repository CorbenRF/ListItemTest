<template>
  <!-- eslint-disable -->
  <div class="output__content">
  <div class="output__header">
    <span class="output__name">{{ listName }}</span>
    <!-- eslint-disable-next-line -->
    <button type="button" class="output__btn" @click="toggleRandom">{{ !this.random ? "Перемешать" : "Сортировать"}}</button>

  </div>
  <div v-if="list.checked" class="output__squares">
  <div class="squares__ordered" v-if="!random">
  <div v-for="row in list.itemList" :key="row.id">
    <div class="output__row" v-if="row.checked" >
      <!-- eslint-disable-next-line -->
      <div class="square" v-for="i in row.amount" @click="removeOne(row.id)" :style="{ backgroundColor: row.color }">

      </div>
    </div>
  </div>

  </div>
  <div class="squares__random" v-else>
    <div class="output__row">
     <!-- eslint-disable-next-line -->
     <div v-for="i in randomOrderOfItems">
      <div class="square" @click="removeOne(i.id)" :style="{ backgroundColor: i.color }"></div>
     </div>

    </div>
  </div>

  </div>
  </div>
</template>

<script>

export default {
  props: ['listName', 'listId'],
  data() {
    return {
      random: false,
    };
  },
  computed: {
    list() {
      return this.$store.getters.getListById(this.listId);
    },
    randomOrderOfItems() {
      const list = this.$store.getters.getListById(this.listId).itemList;
      const squaresArr = [];
      for (const item of list) {
        if (item.amount > 0) {
          for (let i = 0; i < item.amount; i++) {
            if (item.checked) {
              squaresArr.push({
                color: item.color,
                checked: item.checked,
                id: item.id,
              });
            }
          }
        }
      }
      console.log(squaresArr);
      return squaresArr.sort(() => 0.5 - Math.random());
    },
  },
  methods: {
    toggleRandom() {
      this.random = !this.random;
    },
    removeOne(itemId) {
      this.$store.dispatch('removeOneOfItem', { listId: this.listId, itemId });
    },
  },
};

</script>

<style lang="scss">
.output {
  &__content {
    display: flex;
    flex-direction: column;
  }
  &__header {
    display: flex;
    justify-content: space-between;
  }
  &__squares {
    padding: 1rem;
  }
  &__row {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    padding-bottom: 10px;
  }
  &__btn {
    padding: 0.4rem;
    border: none;
    border-radius: 5px;
    outline: none;
    background-color: cornflowerblue;
    color: white;
  }
  &__name {
    font-size: 22px;
  }
}
.square {
  width: 30px;
  height: 30px;
}
.squares__ordered {
  display: flex;
  flex-direction: column;
}
</style>
