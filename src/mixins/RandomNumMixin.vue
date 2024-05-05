<script>
export default {
  /* eslint-disable */
  methods: {
    getRandomInt(min, max) {
      const Min = Math.ceil(min);
      const Max = Math.floor(max);
      return Math.floor(Math.random() * (Max - Min + 1)) + Min;
    },
    getRandomColor() {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    },
  },
};
</script>
