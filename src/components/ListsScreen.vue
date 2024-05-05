<template>
  <div class="list__content">
  <ListComponent listName="List 1" :list_id="1" />
  <ListComponent listName="List 2" :list_id="2" />
  <ListComponent listName="List 3" :list_id="3" />
  <ListComponent listName="List 4" :list_id="4" />
  <ListComponent listName="List 5" :list_id="5" />
  </div>
</template>

<script>
import ListComponent from './ListComponent.vue';

export default {
  components: { ListComponent },
};

</script>

<style lang="scss">
.list {
  &__content {
    width: 45%;
    padding: 1.5rem;
    border: 1px solid #000;
  }
}
</style>
