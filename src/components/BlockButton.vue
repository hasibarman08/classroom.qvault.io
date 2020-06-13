<template>
  <button
    type="submit"
    @click="click"
  >
    <slot />
  </button>
</template>

<script>
export default {
  props: { 
    click:{
      type: Function,
      required: false,
      default: () =>{}
    }
  }
};
</script>

<style scoped lang="scss">
@import '@/styles/colors.scss';

button {
  width: 30%;
  min-width: 75px;
  border-radius: 0px;
  border-width: 0px;
  padding: 10px;
  background-color: $purple-darker;
  color: $white;
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.4);
  cursor: pointer;

  &:hover{
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.8);
    background-color: $purple-light;
  }

  &:focus{
    outline: none !important;
  }
}

</style>
