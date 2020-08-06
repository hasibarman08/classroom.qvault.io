<template>
  <div class="container">
    <span :style="{color: color}">Difficulty Level</span>
    <ScaleBar
      :circles-total="6" 
      :circles-progress="difficulty + 1"
      :fill-color="color"
    />
  </div>
</template>

<script>
import ScaleBar from '@/components/ScaleBar';

export default {
  components: {
    ScaleBar
  },
  props: {
    difficulty: {
      type: Number,
      required: true
    }
  },
  computed:{
    color(){
      if (this.difficulty === 1){
        return '#e058ae';
      }
      if (this.difficulty === 2){
        return '#d82e9a';
      }
      if (this.difficulty === 3){
        return '#ad257b';
      }
      if (this.difficulty === 4){
        return '#821c5c';
      }
      if (this.difficulty === 5){
        return '#56123e';
      }
      return '#ffffff';
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/styles/colors.scss';

.container {
  display: flex;
  flex-direction: column;
  align-items: center;

  .icon {
    color: $gray-lighter;
    margin: .5em;
  }

  span {
    font-size: .75em;
  }
}
</style>
