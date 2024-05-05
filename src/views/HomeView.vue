<template>
  <div class="main">
    <ListsScreen />
    <OutputScreen />
  </div>
</template>

<script>
import ListsScreen from '../components/ListsScreen.vue';
import OutputScreen from '../components/OutputScreen.vue';

export default {
  data() {
    return {

    };
  },
  components: { ListsScreen, OutputScreen },

};

</script>

<style lang="scss">
* {
  box-sizing: border-box;
}
.main {
  min-height: 100vh;
  padding: 2rem;
  margin: 2rem;
  display: flex;
  justify-content: space-between;
  border: 2px solid #000;
}
</style>
