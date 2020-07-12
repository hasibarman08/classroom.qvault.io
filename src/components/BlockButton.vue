<template>
  <button
    type="submit"
    :class="color"
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
    color:{
      type: String,
      required: false,
      default: 'purple'
    }
  }
};
</script>

<style scoped lang="scss">
@import '@/styles/colors.scss';

button {
  border-radius: 0px;
  border-width: 0px;
  padding: 10px 30px 10px 30px;
  color: $white;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.4);
  cursor: pointer;

  &.gray {
    background-color: $gray-dark;

    &:hover{
      box-shadow: 0 4px 8px 0 rgba(0,0,0,0.8);
      background-color: $gray-mid;
    }
  }

  &.green {
    background-color: $green-darker;

    &:hover{
      box-shadow: 0 4px 8px 0 rgba(0,0,0,0.8);
      background-color: $green-mid;
    }
  }

  &.purple {
    background-color: $purple-dark;

    &:hover{
      box-shadow: 0 4px 8px 0 rgba(0,0,0,0.8);
      background-color: $purple-lighter;
    }
  }

  &:focus{
    outline: none !important;
  }
}

</style>
