<template>
  <input
    :placeholder="placeholder"
    :type="type"
    :value="value"
    @input="$emit('input', $event.target.value)"
  >
</template>

<script>
export default {
  props: { 
    value:{
      type: String,
      required: false,
      default: null
    },
    placeholder:{
      type: String,
      required: false,
      default: null
    },
    type:{
      type: String,
      required: false,
      default: 'text'
    }
  }
};
</script>

<style scoped lang="scss">
@import '@/styles/colors.scss';

input {
  border-radius: 0px;
  border-width: 1px;
  padding: 10px;

  &:focus{
    outline: none !important;
    border-color: $purple-mid;
    border-width: 2px;
  }
}
</style>
