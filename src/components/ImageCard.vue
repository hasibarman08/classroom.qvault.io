<template>
  <div id="card">
    <div id="img-container">
      <img
        :src="imgSrc"
        @click="click"
      >
    </div>
    <div id="body">
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
    },
    click: {
      type: Function,
      required: false,
      default: () => {}
    }
  }
};
</script>

<style scoped lang="scss">
@import '@/styles/colors.scss';

#card {
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  background-color: $white;
  overflow: hidden;
  cursor: pointer;
  text-align: center;

  &:hover{
    box-shadow: 0 16px 32px 0 rgba(0,0,0,0.8);

    .body {
      background-color: $gray-dark;
    }
  }
   
  #img-container {
    position: relative;
    
    &:after {
      content: "";
      display: block;
      padding-bottom: 100%;
    }
    img {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }
  }

  #body {
    background-color: $gray-darkest;
    padding: 10px;
  }
}
</style>
