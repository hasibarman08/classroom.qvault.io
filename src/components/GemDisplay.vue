<template>
  <div
    id="gem-display"
  >
    <span v-if="cost">{{ cost }}</span>
    <img
      src="../img/gem-256.png"
    >
  </div>
</template>

<script>
export default {
  props: { 
    cost: {
      type: Number,
      required: false,
      default: null
    }
  }
};
</script>

<style scoped lang="scss">
@import '@/styles/colors.scss';

#gem-display {
  color: $purple-lighter;
  font-size: 24px;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 50px;
  }

  span {
    margin-left: 10px;
  }
}
</style>
