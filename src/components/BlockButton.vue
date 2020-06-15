<template>
  <button
    type="submit"
    :class="type"
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
    },
    type:{
      type: String,
      required: false,
      default: 'success'
    }
  }
};
</script>

<style scoped lang="scss">
@import '@/styles/colors.scss';

button {
  border-radius: 0px;
  border-width: 0px;
  padding: 10px;
  color: $white;
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.4);
  cursor: pointer;

  &.cancel {
    background-color: $gray-dark;

    &:hover{
      box-shadow: 0 8px 16px 0 rgba(0,0,0,0.8);
      background-color: $gray-light;
    }
  }

  &.success {
    background-color: $purple-dark;

    &:hover{
      box-shadow: 0 8px 16px 0 rgba(0,0,0,0.8);
      background-color: $purple-light;
    }
  }

  &:focus{
    outline: none !important;
  }
}

</style>
