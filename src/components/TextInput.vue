<template>
  <input
    :placeholder="placeholder"
    :type="type"
    @input="handleInput"
  >
</template>

<script>
export default {
  props: { 
    value:{
      type: String,
      required: true
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
  },
  methods: {
    handleInput () {
      this.$emit('input', this.value);
    }
  }
};
</script>

<style scoped lang="scss">
@import '@/styles/colors.scss';

input {
  width: 50%;
  min-width: 150px;
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
