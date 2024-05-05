<template>
  <div class="list__content">
  <ListOutput listName="List 1" :listId="1" class="output__item" />
  <ListOutput listName="List 2" :listId="2" class="output__item" />
  <ListOutput listName="List 3" :listId="3" class="output__item" />
  <ListOutput listName="List 4" :listId="4" class="output__item" />
  <ListOutput listName="List 5" :listId="5" class="output__item" />
  </div>
</template>

<script>
import ListOutput from './ListOutput.vue';

export default {
  components: { ListOutput },

};
</script>

<style lang="scss">
.output {
  &__item {
    padding: 1rem;
    margin-bottom: 1rem;
    border: 1px solid black;
    font-style: 22px;
  }
}
</style>
