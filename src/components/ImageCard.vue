<template>
  <div id="card">
    <img :src="imgSrc">
    <div class="body">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: { 
    imgSrc: {
      type: String,
      required: true
    }
  }
};
</script>

<style scoped lang="scss">
@import '@/styles/colors.scss';

#card {
  flex: 0 1 calc(22% - 1em);
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  background-color: $white;
  margin: 15px;
  overflow: hidden;
  cursor: pointer;
  text-align: center;

  &:hover{
    box-shadow: 0 16px 32px 0 rgba(0,0,0,0.8);

    .body {
      background-color: $gray-dark;
    }
  }

  img {
    width: 100%;
  }

  .body {
    background-color: $gray-darkest;
    padding: 10px;
  }
}

</style>
